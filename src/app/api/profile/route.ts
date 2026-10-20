
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  graduationYear: z.number().int().min(2000).max(2100),
  jobTitle: z.string().trim().max(100).optional().default(""),
  company: z.string().trim().max(100).optional().default(""),
  industry: z.string().trim().max(100).optional().default(""),
  skills: z.string().trim().max(500).optional().default(""),
  bio: z.string().trim().max(500).optional().default(""),
  careerGoals: z.string().trim().max(300).optional().default(""),
});

export async function GET() {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      profile: {
        include: { company: true, industry: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PUT(request: Request) {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = profileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid profile details.", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const data = result.data;
    const isAlumni = user.role === "Alumni";

    if (isAlumni && (!data.jobTitle || !data.company)) {
      return NextResponse.json(
        { error: "Alumni must provide their current job title and company." },
        { status: 400 }
      );
    }

    const company = isAlumni && data.company
      ? await prisma.company.upsert({
          where: { name: data.company },
          update: {},
          create: { name: data.company },
        })
      : null;

    const industry = isAlumni && data.industry
      ? await prisma.industry.upsert({
          where: { name: data.industry },
          update: {},
          create: { name: data.industry },
        })
      : null;

    await prisma.user.update({
      where: { id: userId },
      data: { fullName: data.fullName },
    });

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        graduationYear: data.graduationYear,
        jobTitle: isAlumni ? data.jobTitle : null,
        techStack: data.skills,
        bio: data.bio,
        careerGoals: isAlumni ? "" : data.careerGoals,
        company: company
          ? { connect: { id: company.id } }
          : { disconnect: true },
        industry: industry
          ? { connect: { id: industry.id } }
          : { disconnect: true },
      },
      create: {
        userId,
        graduationYear: data.graduationYear,
        jobTitle: isAlumni ? data.jobTitle : null,
        techStack: data.skills,
        bio: data.bio,
        careerGoals: isAlumni ? "" : data.careerGoals,
        ...(company ? { company: { connect: { id: company.id } } } : {}),
        ...(industry ? { industry: { connect: { id: industry.id } } } : {}),
      },
      include: { company: true, industry: true },
    });

    return NextResponse.json({ message: "Profile saved.", profile });
  } catch (error) {
    console.error("Profile update failed:", error);

    return NextResponse.json(
      { error: "Unable to save profile." },
      { status: 500 }
    );
  }
}
