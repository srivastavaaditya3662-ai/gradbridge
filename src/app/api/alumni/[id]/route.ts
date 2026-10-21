
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const profile = await prisma.profile.findFirst({
      where: {
        OR: [{ userId: id }, { id }],
        user: { role: "Alumni" },
      },
      select: {
        id: true,
        userId: true,
        graduationYear: true,
        jobTitle: true,
        techStack: true,
        bio: true,
        careerGoals: true,
        user: {
          select: {
            id: true,
            fullName: true,
            role: true,
          },
        },
        company: { select: { name: true } },
        industry: { select: { name: true } },
      },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "Alumni profile not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Alumni detail error:", error);

    return NextResponse.json(
      { message: "Unable to load this alumni profile." },
      { status: 500 }
    );
  }
}
