
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  BlobServiceClient,
} from "@azure/storage-blob";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";


const MAX_FILE_SIZE = 2 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Please log in first." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("picture");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { message: "Please select an image." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Image must be 2 MB or smaller." },
        { status: 400 }
      );
    }

    const allowedTypes: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };

    const extension = allowedTypes[file.type];

    if (!extension) {
      return NextResponse.json(
        { message: "Use a JPG, PNG, or WebP image." },
        { status: 400 }
      );
    }

    const connectionString =
      process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName =
      process.env.AZURE_STORAGE_CONTAINER;

    if (!connectionString || !containerName) {
      throw new Error("Azure Blob Storage configuration is missing.");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        profile: {
          select: { pictureBlobName: true },
        },
      },
    });

    if (!user || !user.profile) {
      return NextResponse.json(
        { message: "Create your profile before uploading a picture." },
        { status: 404 }
      );
    }

    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);

    const containerClient =
      blobServiceClient.getContainerClient(containerName);

    const blobName = `${userId}/${randomUUID()}.${extension}`;
    const blobClient = containerClient.getBlockBlobClient(blobName);
    const bytes = Buffer.from(await file.arrayBuffer());

    // Verify actual file signatures, not only the supplied MIME type.
    const isJpeg =
      bytes.length >= 3 &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff;

    const isPng =
      bytes.length >= 8 &&
      bytes.subarray(0, 8).equals(
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
      );

    const isWebp =
      bytes.length >= 12 &&
      bytes.toString("ascii", 0, 4) === "RIFF" &&
      bytes.toString("ascii", 8, 12) === "WEBP";

    if (
      (extension === "jpg" && !isJpeg) ||
      (extension === "png" && !isPng) ||
      (extension === "webp" && !isWebp)
    ) {
      return NextResponse.json(
        { message: "The selected file is not a valid image." },
        { status: 400 }
      );
    }

    await blobClient.uploadData(bytes, {
      blobHTTPHeaders: {
        blobContentType: file.type,
      },
    });

    try {
      await prisma.profile.update({
        where: { userId },
        data: { pictureBlobName: blobName },
      });
    } catch (error) {
      await blobClient.deleteIfExists().catch(() => {});
      throw error;
    }

    const oldBlobName = user.profile.pictureBlobName;

    if (oldBlobName && oldBlobName !== blobName) {
      await containerClient
        .getBlockBlobClient(oldBlobName)
        .deleteIfExists()
        .catch((error) => {
          console.error("Old profile picture cleanup failed:", error);
        });
    }

    return NextResponse.json({
      message: "Profile picture uploaded successfully.",
      pictureUrl: "/api/profile/picture",
    });
  } catch (error) {
    console.error("Profile picture upload error:", error);

    return NextResponse.json(
      { message: "Unable to upload the profile picture." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        profile: {
          select: { pictureBlobName: true },
        },
      },
    });

    const blobName = user?.profile?.pictureBlobName;

    if (!blobName) {
      return new Response("Profile picture not found", { status: 404 });
    }

    const connectionString =
      process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName =
      process.env.AZURE_STORAGE_CONTAINER;

    if (!connectionString || !containerName) {
      throw new Error("Azure Blob Storage configuration is missing.");
    }

    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);

    const blobClient = blobServiceClient
      .getContainerClient(containerName)
      .getBlockBlobClient(blobName);

    const download = await blobClient.download();
    const chunks: Buffer[] = [];

    for await (const chunk of download.readableStreamBody!) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    const image = Buffer.concat(chunks);

    return new Response(new Uint8Array(image), {
      headers: {
        "Content-Type": download.contentType || "application/octet-stream",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Profile picture retrieval error:", error);

    return new Response("Unable to load profile picture", {
      status: 500,
    });
  }
}
