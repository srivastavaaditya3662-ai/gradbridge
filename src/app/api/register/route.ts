
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(72),
  role: z.enum(["Student", "Alumni"]),
  graduationYear: z.coerce.number().int().min(2000).max(2100),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your registration details." },
        { status: 400 }
      );
    }

    const data = result.data;
    const email = data.email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email,
        passwordHash,
        role: data.role,
        profile: {
          create: {
            graduationYear: data.graduationYear,
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    await createSession(user.id);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Registration failed:", error);

    return NextResponse.json(
      { error: "Unable to register. Please try again." },
      { status: 500 }
    );
  }
}
