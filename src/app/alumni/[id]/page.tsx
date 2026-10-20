
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const alumniProfiles = [
  {
    id: "1",
    name: "Aarav Sharma",
    initials: "AS",
    role: "Software Engineer",
    company: "Microsoft",
    industry: "Technology",
    year: "2023",
    location: "India",
    skills: ["Python", "Azure", "AI/ML"],
    color: "bg-blue-100 text-blue-700",
    bio: "I work on software solutions and cloud technologies. I enjoy solving problems, learning new tools, and helping students understand software engineering career paths.",
  },
  {
    id: "2",
    name: "Priya Verma",
    initials: "PV",
    role: "Data Scientist",
    company: "Amazon",
    industry: "Technology",
    year: "2022",
    location: "India",
    skills: ["Python", "SQL", "Machine Learning"],
    color: "bg-purple-100 text-purple-700",
    bio: "I work with data and machine learning to discover useful insights. I am interested in helping students learn about data science projects and career preparation.",
  },
  {
    id: "3",
    name: "Rohan Gupta",
    initials: "RG",
    role: "Frontend Developer",
    company: "Adobe",
    industry: "Technology",
    year: "2024",
    location: "India",
    skills: ["React", "JavaScript", "CSS"],
    color: "bg-orange-100 text-orange-700",
    bio: "I build user-friendly web experiences and enjoy learning modern frontend technologies. I can share guidance on frontend development and project building.",
  },
  {
    id: "4",
    name: "Sneha Singh",
    initials: "SS",
    role: "Business Analyst",
    company: "Deloitte",
    industry: "Consulting",
    year: "2022",
    location: "India",
    skills: ["Excel", "SQL", "Power BI"],
    color: "bg-pink-100 text-pink-700",
    bio: "I work with business data and reporting tools to support better decisions. I am interested in analytics, communication, and professional development.",
  },
  {
    id: "5",
    name: "Kabir Mehta",
    initials: "KM",
    role: "Cloud Engineer",
    company: "Accenture",
    industry: "Cloud Computing",
    year: "2023",
    location: "India",
    skills: ["AWS", "Docker", "Linux"],
    color: "bg-green-100 text-green-700",
    bio: "I work with cloud infrastructure and deployment technologies. I enjoy exploring cloud platforms and sharing practical learning resources.",
  },
  {
    id: "6",
    name: "Ananya Kapoor",
    initials: "AK",
    role: "ML Engineer",
    company: "Google",
    industry: "Technology",
    year: "2024",
    location: "India",
    skills: ["Python", "TensorFlow", "AI/ML"],
    color: "bg-indigo-100 text-indigo-700",
    bio: "I work on machine learning solutions and enjoy experimenting with AI technologies. I am happy to share insights about ML projects and technical preparation.",
  },
];

export default function AlumniProfilePage() {
  const params = useParams<{ id: string }>();
  const person = alumniProfiles.find((item) => item.id === params.id);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/alumni"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            ← Back to alumni directory
          </Link>

          {!person ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <h1 className="text-2xl font-bold text-slate-900">
                Alumni profile not found
              </h1>
              <p className="mt-3 text-slate-600">
                This profile may not exist in the sample directory.
              </p>
              <Link
                href="/alumni"
                className="mt-6 inline-block rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Explore alumni
              </Link>
            </div>
          ) : (
            <>
              <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="h-36 bg-gradient-to-r from-blue-950 via-indigo-800 to-blue-500 md:h-48" />

                <div className="px-6 pb-8 md:px-10">
                  <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-end gap-4">
                      <div
                        className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-4 border-white text-2xl font-bold shadow-sm ${person.color}`}
                      >
                        {person.initials}
                      </div>
                      <div className="pb-1">
                        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                          {person.name}
                        </h1>
                        <p className="mt-1 text-slate-600">{person.role}</p>
                      </div>
                    </div>

                    <Link
                      href={`/requests?alumniId=${person.id}`}
                      className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                    >
                      Request a connection →
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-slate-500">Company</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {person.company}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Graduation year</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {person.year}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Industry</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {person.industry}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <section className="rounded-2xl border border-slate-200 bg-white p-6 md:col-span-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    About
                  </h2>
                  <p className="mt-4 leading-7 text-slate-600">
                    {person.bio}
                  </p>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h2 className="text-lg font-bold text-slate-900">
                    Skills and technologies
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {person.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="mt-1 font-medium text-slate-800">
                      {person.location}
                    </p>
                  </div>
                </section>
              </div>

              <p className="mt-6 text-xs text-slate-500">
                Demo profile: this information is sample data, not a verified
                alumni account.
              </p>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
