
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Alumni = {
  id: string;
  userId: string;
  graduationYear: number;
  jobTitle: string | null;
  techStack: string;
  bio: string;
  user: {
    id: string;
    fullName: string;
  };
  company: { name: string } | null;
  industry: { name: string } | null;
};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 outline-none focus:border-indigo-500";

export default function AlumniPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [skill, setSkill] = useState("");
  const [industry, setIndustry] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAlumni() {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (search.trim()) params.set("search", search.trim());
      if (company.trim()) params.set("company", company.trim());
      if (skill.trim()) params.set("skill", skill.trim());
      if (industry.trim()) params.set("industry", industry.trim());
      if (year.trim()) params.set("year", year.trim());

      const response = await fetch(`/api/alumni?${params.toString()}`, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to load alumni.");
      }

      setAlumni(
  Array.isArray(data) ? data : data.alumni ?? data.profiles ?? []
);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load alumni."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAlumni();
    // Load initial directory once when the page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadAlumni();
  }

  function clearFilters() {
    setSearch("");
    setCompany("");
    setSkill("");
    setIndustry("");
    setYear("");

    setLoading(true);
    setError("");

    fetch("/api/alumni", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message ?? "Unable to load alumni.");
        }
        setAlumni(
  Array.isArray(data) ? data : data.alumni ?? data.profiles ?? []
);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : "Unable to load alumni."
        );
      })
      .finally(() => setLoading(false));
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          GradBridge Network
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Discover alumni
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Find graduates by company, skills, industry and graduation year.
          Explore their experience and connect with them.
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-3"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Name or keyword
            </label>
            <input
              className={inputClass}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name or job title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Company
            </label>
            <input
              className={inputClass}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Microsoft"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Skill or tech stack
            </label>
            <input
              className={inputClass}
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g. Python"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Industry
            </label>
            <input
              className={inputClass}
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. AI or Finance"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Graduation year
            </label>
            <input
              className={inputClass}
              type="number"
              min={2000}
              max={2100}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2024"
            />
          </div>

          <div className="flex items-end gap-3">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Search
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">Alumni directory</h2>
          {!loading && (
            <span className="text-sm text-slate-500">
              {alumni.length} result(s)
            </span>
          )}
        </div>

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-12 text-center text-slate-600">
            Loading alumni...
          </p>
        ) : alumni.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h3 className="text-lg font-semibold">No alumni found</h3>
            <p className="mt-2 text-slate-600">
              Try different filters, or create an Alumni account and complete
              its profile to add a directory entry.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {alumni.map((person) => (
              <article
                key={person.user.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-bold text-indigo-700">
                  {person.user.fullName.charAt(0).toUpperCase()}
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  {person.user.fullName}
                </h3>
                <p className="mt-1 text-sm text-indigo-700">
                  {person.jobTitle || "Career information not added"}
                </p>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">
                      Company:
                    </span>{" "}
                    {person.company?.name || "Not specified"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Industry:
                    </span>{" "}
                    {person.industry?.name || "Not specified"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Graduated:
                    </span>{" "}
                    {person.graduationYear}
                  </p>
                </div>

                {person.techStack && (
                  <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                    <span className="font-semibold">Skills: </span>
                    {person.techStack}
                  </p>
                )}

                <Link
                  href={`/alumni/${person.user.id}`}
                  className="mt-5 inline-flex justify-center rounded-xl border border-indigo-200 px-4 py-3 font-semibold text-indigo-700 hover:bg-indigo-50"
                >
                  View profile
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
