
"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("Your Name");
  const [graduationYear, setGraduationYear] = useState("2027");
  const [role, setRole] = useState("Student");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("Technology");
  const [skills, setSkills] = useState("Python, C++, Machine Learning");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(
      "Profile validated. Changes are currently temporary and will be saved permanently once the database API is connected."
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-5 py-10 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-800">
                Your account
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950">
                My profile
              </h1>
              <p className="mt-2 text-slate-700">
                Keep your academic and professional information up to date.
              </p>
            </div>

            <Link
              href="/alumni"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Browse alumni
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-bold text-blue-900">
                {fullName.trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase())
                  .join("") || "U"}
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-950">
                {fullName || "Your Name"}
              </h2>
              <p className="mt-1 text-sm text-slate-700">{role}</p>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Profile checklist
                </p>
                <ul className="mt-4 space-y-3 text-sm text-slate-800">
                  <li>{fullName.trim() ? "✓" : "○"} Name</li>
                  <li>{graduationYear ? "✓" : "○"} Graduation year</li>
                  <li>{skills.trim() ? "✓" : "○"} Skills</li>
                  <li>{bio.trim() ? "✓" : "○"} About you</li>
                </ul>
              </div>

              <p className="mt-6 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                Demo mode: this page does not yet load or save a real user
                account.
              </p>
            </aside>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-slate-950">
                Profile information
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Enter the details you want displayed on your profile.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-900">
                      Full name
                    </label>
                    <input
                      id="fullName"
                      required
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="mb-2 block text-sm font-semibold text-slate-900">
                      Account type
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black outline-none focus:border-blue-700"
                    >
                      <option>Student</option>
                      <option>Alumni</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="graduationYear" className="mb-2 block text-sm font-semibold text-slate-900">
                      Graduation year
                    </label>
                    <select
                      id="graduationYear"
                      value={graduationYear}
                      onChange={(event) => setGraduationYear(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black outline-none focus:border-blue-700"
                    >
                      {Array.from({ length: 15 }, (_, index) => 2024 + index).map(
                        (year) => (
                          <option key={year} value={String(year)}>
                            {year}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="jobTitle" className="mb-2 block text-sm font-semibold text-slate-900">
                      Current job title
                    </label>
                    <input
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(event) => setJobTitle(event.target.value)}
                      placeholder="e.g. Software Engineer"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-semibold text-slate-900">
                      Company
                    </label>
                    <input
                      id="company"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      placeholder="e.g. Microsoft"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="mb-2 block text-sm font-semibold text-slate-900">
                      Industry
                    </label>
                    <select
                      id="industry"
                      value={industry}
                      onChange={(event) => setIndustry(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black outline-none focus:border-blue-700"
                    >
                      <option>Technology</option>
                      <option>Consulting</option>
                      <option>Cloud Computing</option>
                      <option>Finance</option>
                      <option>Healthcare</option>
                      <option>Education</option>
                      <option>Marketing</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="skills" className="mb-2 block text-sm font-semibold text-slate-900">
                    Skills and technologies
                  </label>
                  <input
                    id="skills"
                    value={skills}
                    onChange={(event) => setSkills(event.target.value)}
                    placeholder="Python, SQL, Azure, React"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  />
                  <p className="mt-2 text-xs text-slate-600">
                    Separate skills with commas.
                  </p>
                </div>

                <div>
                  <label htmlFor="bio" className="mb-2 block text-sm font-semibold text-slate-900">
                    About you
                  </label>
                  <textarea
                    id="bio"
                    rows={5}
                    maxLength={500}
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    placeholder="Describe your interests, experience, projects, or career goals..."
                    className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-black placeholder:text-slate-500 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  />
                  <p className="mt-2 text-right text-xs text-slate-600">
                    {bio.length}/500 characters
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-800 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-900 sm:w-auto"
                >
                  Save profile
                </button>
              </form>

              {message && (
                <p role="status" className="mt-5 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-950">
                  {message}
                </p>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
