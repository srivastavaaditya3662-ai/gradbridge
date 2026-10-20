
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const alumni = [
  {
    id: "1",
    name: "Aarav Sharma",
    role: "Software Engineer",
    company: "Microsoft",
    industry: "Technology",
    year: "2023",
    skills: ["Python", "Azure", "AI/ML"],
    initials: "AS",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "2",
    name: "Priya Verma",
    role: "Data Scientist",
    company: "Amazon",
    industry: "Technology",
    year: "2022",
    skills: ["Python", "SQL", "Machine Learning"],
    initials: "PV",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "3",
    name: "Rohan Gupta",
    role: "Frontend Developer",
    company: "Adobe",
    industry: "Technology",
    year: "2024",
    skills: ["React", "JavaScript", "CSS"],
    initials: "RG",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "4",
    name: "Sneha Singh",
    role: "Business Analyst",
    company: "Deloitte",
    industry: "Consulting",
    year: "2022",
    skills: ["Excel", "SQL", "Power BI"],
    initials: "SS",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: "5",
    name: "Kabir Mehta",
    role: "Cloud Engineer",
    company: "Accenture",
    industry: "Cloud Computing",
    year: "2023",
    skills: ["AWS", "Docker", "Linux"],
    initials: "KM",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "6",
    name: "Ananya Kapoor",
    role: "ML Engineer",
    company: "Google",
    industry: "Technology",
    year: "2024",
    skills: ["Python", "TensorFlow", "AI/ML"],
    initials: "AK",
    color: "bg-indigo-100 text-indigo-700",
  },
];

export default function AlumniDirectory() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All industries");
  const [year, setYear] = useState("All years");

  const filteredAlumni = useMemo(() => {
    const query = search.toLowerCase().trim();

    return alumni.filter((person) => {
      const matchesSearch =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.role.toLowerCase().includes(query) ||
        person.company.toLowerCase().includes(query) ||
        person.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );

      const matchesIndustry =
        industry === "All industries" || person.industry === industry;

      const matchesYear = year === "All years" || person.year === year;

      return matchesSearch && matchesIndustry && matchesYear;
    });
  }, [search, industry, year]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-16 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Your network starts here
            </p>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Find alumni. Build connections. Grow your career.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Explore alumni careers, discover industry opportunities, and
              connect with graduates who can guide your next step.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-200">
              <span className="rounded-full border border-white/20 px-4 py-2">
                {alumni.length} sample alumni
              </span>
              <span className="rounded-full border border-white/20 px-4 py-2">
                Search by skills or company
              </span>
              <span className="rounded-full border border-white/20 px-4 py-2">
                Discover career paths
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Alumni directory
            </h2>
            <p className="mt-2 text-slate-600">
              Search the directory and filter alumni by industry or graduation
              year.
            </p>
          </div>

          <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">
            <div className="md:col-span-1">
              <label
                htmlFor="alumni-search"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Search alumni
              </label>
              <input
                id="alumni-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Name, company, role, or skill..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="industry-filter"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Industry
              </label>
              <select
                id="industry-filter"
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option>All industries</option>
                <option>Technology</option>
                <option>Consulting</option>
                <option>Cloud Computing</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="year-filter"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Graduation year
              </label>
              <select
                id="year-filter"
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option>All years</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredAlumni.length}
              </span>{" "}
              {filteredAlumni.length === 1 ? "alumnus" : "alumni"}
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setIndustry("All industries");
                setYear("All years");
              }}
              className="text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Clear filters
            </button>
          </div>

          {filteredAlumni.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAlumni.map((person) => (
                <article
                  key={person.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${person.color}`}
                    >
                      {person.initials}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {person.role}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-blue-700">
                        {person.company}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      Class of {person.year}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {person.industry}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {person.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-xs text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <Link
                      href={`/alumni/${person.id}`}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View profile <span className="ml-2">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No alumni found
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Try another name, company, skill, industry, or graduation year.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setIndustry("All industries");
                  setYear("All years");
                }}
                className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Reset search
              </button>
            </div>
          )}

          <p className="mt-8 text-xs leading-5 text-slate-500">
            Demo notice: these alumni profiles are sample data for development.
            They are not real user accounts.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
