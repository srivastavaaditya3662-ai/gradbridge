
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Please log in first." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            company: true,
            industry: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile GET error:", error);

    return NextResponse.json(
      { message: "Unable to load your profile." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Please log in first." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const fullName =
      typeof body.fullName === "string"
        ? body.fullName.trim()
        : "";

    const graduationYear = Number(body.graduationYear);

    if (
      !fullName ||
      fullName.length > 100 ||
      !Number.isInteger(graduationYear) ||
      graduationYear < 1900 ||
      graduationYear > 2100
    ) {
      return NextResponse.json(
        { message: "Enter a valid name and graduation year." },
        { status: 400 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    const cleanString = (value: unknown): string =>
      typeof value === "string" ? value.trim() : "";

    const bio = cleanString(body.bio);
    const careerGoals = cleanString(body.careerGoals);

    if (bio.length > 1000 || careerGoals.length > 1000) {
      return NextResponse.json(
        { message: "Bio and career goals must be 1000 characters or fewer." },
        { status: 400 }
      );
    }

    let jobTitle: string | null = null;
    let techStack = "";
    let companyId: string | null = null;
    let industryId: string | null = null;

    if (currentUser.role === "Alumni") {
      jobTitle = cleanString(body.jobTitle) || null;
      techStack = cleanString(body.techStack);

      const companyName = cleanString(body.company);
      const industryName = cleanString(body.industry);

      if (
        jobTitle && jobTitle.length > 150 ||
        companyName.length > 150 ||
        industryName.length > 100 ||
        techStack.length > 500
      ) {
        return NextResponse.json(
          { message: "One or more profile fields are too long." },
          { status: 400 }
        );
      }

      const result = await prisma.$transaction(async (tx) => {
        const company = companyName
          ? await tx.company.upsert({
              where: { name: companyName },
              update: {},
              create: { name: companyName },
            })
          : null;

        const industry = industryName
          ? await tx.industry.upsert({
              where: { name: industryName },
              update: {},
              create: { name: industryName },
            })
          : null;

        companyId = company?.id ?? null;
        industryId = industry?.id ?? null;

        await tx.user.update({
          where: { id: userId },
          data: { fullName },
        });

        return tx.profile.upsert({
          where: { userId },
          update: {
            graduationYear,
            jobTitle,
            companyId,
            industryId,
            techStack,
            bio,
            careerGoals: "",
          },
          create: {
            userId,
            graduationYear,
            jobTitle,
            companyId,
            industryId,
            techStack,
            bio,
            careerGoals: "",
          },
          include: {
            company: true,
            industry: true,
          },
        });
      });

      return NextResponse.json({
        message: "Profile saved successfully.",
        profile: result,
      });
    }

    if (currentUser.role === "Student") {
      const result = await prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: userId },
          data: { fullName },
        });

        return tx.profile.upsert({
          where: { userId },
          update: {
            graduationYear,
            jobTitle: null,
            companyId: null,
            industryId: null,
            techStack: "",
            bio,
            careerGoals,
          },
          create: {
            userId,
            graduationYear,
            jobTitle: null,
            companyId: null,
            industryId: null,
            techStack: "",
            bio,
            careerGoals,
          },
        });
      });

      return NextResponse.json({
        message: "Profile saved successfully.",
        profile: result,
      });
    }

    return NextResponse.json(
      { message: "Your account role cannot update profiles." },
      { status: 403 }
    );
  } catch (error) {
    console.error("Profile PUT error:", error);

    return NextResponse.json(
      { message: "Unable to save your profile. Check the server terminal for details." },
      { status: 500 }
    );
  }
}
