
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

const requestSchema = z.object({
  alumniId: z.string().min(1),
  message: z.string().trim().min(1).max(160),
});

export async function GET() {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated." },
        { status: 401 }
      );
    }

    const requests = await prisma.request.findMany({
      where: {
        OR: [{ studentId: userId }, { alumniId: userId }],
      },
      orderBy: { createdAt: "desc" },
      include: {
        student: {
          select: { id: true, fullName: true },
        },
        alumni: {
          select: { id: true, fullName: true },
        },
      },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Request loading failed:", error);

    return NextResponse.json(
      { message: "Unable to load requests." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Please log in first." },
        { status: 401 }
      );
    }

    const body: unknown = await request.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message:
            "Provide an alumni ID and a message of up to 160 characters.",
        },
        { status: 400 }
      );
    }

    const sender = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!sender || sender.role !== "Student") {
      return NextResponse.json(
        { message: "Only student accounts can send connection requests." },
        { status: 403 }
      );
    }

    if (result.data.alumniId === userId) {
      return NextResponse.json(
        { message: "You cannot send a request to yourself." },
        { status: 400 }
      );
    }

    const recipient = await prisma.user.findUnique({
      where: { id: result.data.alumniId },
      select: { id: true, role: true },
    });

    if (!recipient || recipient.role !== "Alumni") {
      return NextResponse.json(
        { message: "The selected alumni account was not found." },
        { status: 404 }
      );
    }

    const connectionRequest = await prisma.request.create({
      data: {
        studentId: userId,
        alumniId: recipient.id,
        message: result.data.message,
      },
    });

    return NextResponse.json(
      {
        message: "Connection request created.",
        request: connectionRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request creation failed:", error);

    return NextResponse.json(
      { message: "Unable to create the connection request." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Please log in first." },
        { status: 401 }
      );
    }

    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("requestId" in body) ||
      typeof body.requestId !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid request update." },
        { status: 400 }
      );
    }

    const existingRequest = await prisma.request.findUnique({
      where: { id: body.requestId },
      select: {
        id: true,
        alumniId: true,
        status: true,
      },
    });

    if (!existingRequest || existingRequest.alumniId !== userId) {
      return NextResponse.json(
        { message: "Request not found." },
        { status: 404 }
      );
    }

    // Alumni reply
    if ("reply" in body) {
      if (
        typeof body.reply !== "string" ||
        body.reply.trim().length === 0 ||
        body.reply.trim().length > 500
      ) {
        return NextResponse.json(
          { message: "Reply must contain 1–500 characters." },
          { status: 400 }
        );
      }

      const updatedRequest = await prisma.request.update({
        where: { id: existingRequest.id },
        data: { reply: body.reply.trim() },
      });

      return NextResponse.json({
        message: "Reply sent successfully.",
        request: updatedRequest,
      });
    }

    // Accept or Reject
    if (
      !("status" in body) ||
      typeof body.status !== "string" ||
      !["Accepted", "Rejected"].includes(body.status)
    ) {
      return NextResponse.json(
        { message: "Invalid request update." },
        { status: 400 }
      );
    }

    if (existingRequest.status !== "Pending") {
      return NextResponse.json(
        { message: "This request has already been processed." },
        { status: 409 }
      );
    }

    const updatedRequest = await prisma.request.update({
      where: { id: existingRequest.id },
      data: { status: body.status },
    });

    return NextResponse.json({
      message: `Request ${updatedRequest.status.toLowerCase()}.`,
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Request update error:", error);

    return NextResponse.json(
      { message: "Unable to update the request." },
      { status: 500 }
    );
  }
}
