
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
    color: "bg-blue-100 text-blue-800",
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
    color: "bg-purple-100 text-purple-800",
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
    color: "bg-orange-100 text-orange-800",
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
    color: "bg-pink-100 text-pink-800",
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
    color: "bg-green-100 text-green-800",
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
    color: "bg-indigo-100 text-indigo-800",
  },
];

const companies = [
  "Microsoft",
  "Amazon",
  "Adobe",
  "Deloitte",
  "Accenture",
  "Google",
];

const skills = [
  "Python",
  "Azure",
  "AI/ML",
  "SQL",
  "Machine Learning",
  "React",
  "JavaScript",
  "CSS",
  "Excel",
  "Power BI",
  "AWS",
  "Docker",
  "Linux",
  "TensorFlow",
];

export default function AlumniDirectory() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [skill, setSkill] = useState("");
  const [industry, setIndustry] = useState("");
  const [year, setYear] = useState("");

  const filteredAlumni = useMemo(() => {
    const query = search.trim().toLowerCase();

    return alumni.filter((person) => {
      const matchesSearch =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.role.toLowerCase().includes(query) ||
        person.company.toLowerCase().includes(query) ||
        person.industry.toLowerCase().includes(query) ||
        person.skills.some((item) => item.toLowerCase().includes(query));

      const matchesCompany = !company || person.company === company;
      const matchesSkill = !skill || person.skills.includes(skill);
      const matchesIndustry = !industry || person.industry === industry;
      const matchesYear = !year || person.year === year;

      return (
        matchesSearch &&
        matchesCompany &&
        matchesSkill &&
        matchesIndustry &&
        matchesYear
      );
    });
  }, [search, company, skill, industry, year]);

  function clearFilters() {
    setSearch("");
    setCompany("");
    setSkill("");
    setIndustry("");
    setYear("");
  }

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

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
              Discover graduates, explore career paths, and connect with
              professionals who can guide your next step.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white">
              <span className="rounded-full border border-white/30 px-4 py-2">
                {alumni.length} sample alumni
              </span>
              <span className="rounded-full border border-white/30 px-4 py-2">
                Search by company or skill
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900">
              Alumni directory
            </h2>
            <p className="mt-2 text-slate-700">
              Find the right people using search and filters.
            </p>
          </div>

          <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-3">
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                Search by name, company, role, or skill
              </label>
              <input
                id="search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Try Microsoft, Python, Data Scientist..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-black placeholder:text-slate-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                Filter by company
              </label>
              <select
                id="company"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-black outline-none focus:border-blue-600"
              >
                <option value="">All companies</option>
                {companies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="skill"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                Filter by skill
              </label>
              <select
                id="skill"
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-black outline-none focus:border-blue-600"
              >
                <option value="">All skills</option>
                {skills.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="industry"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                Filter by industry
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-black outline-none focus:border-blue-600"
              >
                <option value="">All industries</option>
                <option value="Technology">Technology</option>
                <option value="Consulting">Consulting</option>
                <option value="Cloud Computing">Cloud Computing</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="year"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                Graduation year
              </label>
              <select
                id="year"
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-black outline-none focus:border-blue-600"
              >
                <option value="">All years</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={clearFilters}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Clear all filters
              </button>
            </div>
          </div>

          <div className="mb-5 mt-7 flex items-center justify-between">
            <p className="text-sm text-slate-700">
              Showing{" "}
              <span className="font-bold text-slate-950">
                {filteredAlumni.length}
              </span>{" "}
              of {alumni.length} alumni
            </p>
          </div>

          {filteredAlumni.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAlumni.map((person) => (
                <article
                  key={person.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${person.color}`}
                    >
                      {person.initials}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-950">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-700">
                        {person.role}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-blue-800">
                        {person.company}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800">
                      Class of {person.year}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800">
                      {person.industry}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {person.skills.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-900"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <Link
                      href={`/alumni/${person.id}`}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                    >
                      View profile →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <h3 className="text-lg font-bold text-slate-950">
                No alumni found
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Try a different search or clear your filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-800 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900"
              >
                Reset filters
              </button>
            </div>
          )}

          <p className="mt-8 text-xs text-slate-600">
            Demo notice: these profiles use sample data and are not real user
            accounts.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
