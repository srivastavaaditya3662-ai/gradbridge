
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const instant = false;
export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const search = params.get("search")?.trim();
    const company = params.get("company")?.trim();
    const skill = params.get("skill")?.trim();
    const industry = params.get("industry")?.trim();
    const yearValue = params.get("year");

    let year: number | undefined;

    if (yearValue) {
      year = Number(yearValue);

      if (!Number.isInteger(year) || year < 2000 || year > 2100) {
        return NextResponse.json(
          { error: "Invalid graduation year." },
          { status: 400 }
        );
      }
    }

    const where: Prisma.ProfileWhereInput = {
      user: { role: "Alumni" },
    };

    if (search) {
      where.OR = [
        { user: { fullName: { contains: search } } },
        { jobTitle: { contains: search } },
        { techStack: { contains: search } },
        { company: { is: { name: { contains: search } } } },
      ];
    }

    if (company) {
      where.company = { is: { name: { contains: company } } };
    }

    if (skill) {
      where.techStack = { contains: skill };
    }

    if (industry) {
      where.industry = { is: { name: { contains: industry } } };
    }

    if (year !== undefined) {
      where.graduationYear = year;
    }

    const profiles = await prisma.profile.findMany({
      where,
      take: 100,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        graduationYear: true,
        jobTitle: true,
        techStack: true,
        bio: true,
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
        company: {
          select: { id: true, name: true },
        },
        industry: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({ alumni: profiles });
  } catch (error) {
    console.error("Alumni search failed:", error);

    return NextResponse.json(
      { error: "Unable to retrieve alumni." },
      { status: 500 }
    );
  }
}
