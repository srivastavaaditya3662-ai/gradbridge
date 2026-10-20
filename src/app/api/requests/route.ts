
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

const requestSchema = z.object({
  alumniId: z.string().min(1),
  message: z.string().trim().min(1).max(160),
});

export async function GET() {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
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
}

export async function POST(request: Request) {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Provide an alumni ID and a message of up to 160 characters." },
        { status: 400 }
      );
    }

    const sender = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!sender || sender.role !== "Student") {
      return NextResponse.json(
        { error: "Only student accounts can send connection requests." },
        { status: 403 }
      );
    }

    if (result.data.alumniId === userId) {
      return NextResponse.json(
        { error: "You cannot send a request to yourself." },
        { status: 400 }
      );
    }

    const recipient = await prisma.user.findUnique({
      where: { id: result.data.alumniId },
      select: { id: true, role: true },
    });

    if (!recipient || recipient.role !== "Alumni") {
      return NextResponse.json(
        { error: "The selected alumni account was not found." },
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
      { message: "Connection request created.", request: connectionRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request creation failed:", error);

    return NextResponse.json(
      { error: "Unable to create the connection request." },
      { status: 500 }
    );
  }
}
