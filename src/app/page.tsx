
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type User = {
  id?: string;
  fullName?: string;
  role?: string;
};

const features = [
  {
    number: "01",
    title: "Find relevant alumni",
    description:
      "Discover graduates by company, industry, graduation year, and technical skills.",
  },
  {
    number: "02",
    title: "Learn from experience",
    description:
      "Explore career journeys and learn how graduates entered their fields.",
  },
  {
    number: "03",
    title: "Build connections",
    description:
      "Send connection and referral requests to alumni who match your goals.",
  },
];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function PublicLandingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Your network. Your next opportunity.
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Your next chapter starts with a{" "}
              <span className="text-indigo-600">connection.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Connect with graduates, discover career journeys, and reach
              professionals who can help you take your next career step.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/alumni"
                className="rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Explore Alumni <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
              >
                Join GradBridge
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <span>✓ Career discovery</span>
              <span>✓ Alumni connections</span>
              <span>✓ Referral opportunities</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-200/50 to-blue-100/30 blur-2xl" />

            <div className="relative rounded-3xl border border-white bg-white/90 p-7 shadow-2xl shadow-indigo-900/10 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                    Meet your community
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    Great careers grow through connections.
                  </h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                  <span aria-hidden="true">✦</span>
                </div>
              </div>

              <p className="mt-4 leading-7 text-slate-600">
                Find professionals in your field, learn from their
                experiences, and start meaningful conversations.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  ["01", "Explore career paths"],
                  ["02", "Discover alumni by skills"],
                  ["03", "Request guidance and referrals"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-sm font-extrabold text-indigo-700">
                      {number}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {label}
                    </span>
                    <span className="ml-auto text-indigo-600">→</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-center text-sm text-slate-500">
                One community. More ways to move forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <SectionTitle
          eyebrow="How GradBridge helps"
          title="More than a directory."
          description="Discover professionals, learn from their experience, and turn your search for guidance into real connections."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-sm font-extrabold text-indigo-700 transition group-hover:bg-indigo-600 group-hover:text-white">
                {feature.number}
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 to-blue-600 px-7 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Start building your network.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-indigo-100">
              Your next opportunity could begin with a conversation.
            </p>
            <Link
              href="/register"
              className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 font-bold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              Create your account →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Dashboard({
  user,
}: {
  user: User;
}) {
  const isAlumni = user.role?.toLowerCase() === "alumni";
  const isAdmin = user.role?.toLowerCase() === "admin";

  const actions = isAlumni
    ? [
        {
          icon: "👤",
          title: "Update your profile",
          description: "Keep your professional experience and skills current.",
          href: "/profile",
          button: "Edit profile",
        },
        {
          icon: "✉️",
          title: "Review requests",
          description: "View connection and referral requests from students.",
          href: "/requests",
          button: "View requests",
        },
        {
          icon: "🔎",
          title: "Explore the directory",
          description: "Discover other graduates in your professional network.",
          href: "/alumni",
          button: "Browse alumni",
        },
      ]
    : [
        {
          icon: "🔎",
          title: "Find alumni",
          description: "Discover graduates by company, industry, and skills.",
          href: "/alumni",
          button: "Explore directory",
        },
        {
          icon: "✉️",
          title: "My requests",
          description: "Keep track of the connection requests you have sent.",
          href: "/requests",
          button: "View requests",
        },
        {
          icon: "👤",
          title: "My profile",
          description: "Keep your personal information and career goals updated.",
          href: "/profile",
          button: "View profile",
        },
      ];

  return (
    <section className="mx-auto min-h-[65vh] max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 p-7 text-white shadow-xl shadow-indigo-900/10 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-50">
            {user.role || "Member"} dashboard
          </span>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Welcome back{user.fullName?.trim()
              ? `, ${user.fullName.trim().split(/\s+/)[0]}`
              : ""}
            !
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-indigo-100">
            {isAlumni
              ? "Your experience can make a difference. Keep your profile up to date and help students discover their next opportunity."
              : isAdmin
                ? "Access the GradBridge community and explore the platform's core areas."
                : "Your next opportunity could be one connection away. Discover alumni and take the next step toward your career goals."}
          </p>

          <Link
            href={isAlumni ? "/requests" : "/alumni"}
            className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50"
          >
            {isAlumni ? "Review requests →" : "Explore alumni →"}
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
          Your workspace
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          What would you like to do?
        </h2>
        <p className="mt-3 text-slate-600">
          Pick up where you left off.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <article
            key={action.title}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
              {action.icon}
            </span>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              {action.title}
            </h3>

            <p className="mt-2 flex-1 leading-7 text-slate-600">
              {action.description}
            </p>

            <Link
              href={action.href}
              className="mt-6 inline-flex items-center font-bold text-indigo-700 hover:text-indigo-900"
            >
              {action.button} <span className="ml-2">→</span>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6 sm:p-7">
        <h3 className="font-bold text-slate-900">A quick reminder</h3>
        <p className="mt-2 leading-7 text-slate-600">
          {isAlumni
            ? "A complete profile makes it easier for students to understand your experience and reach out with relevant requests."
            : "Use the alumni directory filters to narrow your search. When you find a relevant graduate, send a clear and respectful connection request."}
        </p>
        <Link
          href="/profile"
          className="mt-4 inline-flex font-bold text-indigo-700 hover:text-indigo-900"
        >
          {isAlumni ? "Update your profile" : "Complete your profile"} →
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        const data = await response.json().catch(() => null);

        if (!active) return;

        if (response.ok) {
          const currentUser = data?.user ?? data;

          if (currentUser && typeof currentUser === "object") {
            setUser(currentUser as User);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setCheckingSession(false);
        }
      }
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {checkingSession ? (
        <section
          className="flex min-h-[65vh] items-center justify-center px-5"
          aria-label="Loading your GradBridge page"
        >
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
            <p className="mt-4 text-sm font-medium text-slate-500">
              Preparing your GradBridge experience...
            </p>
          </div>
        </section>
      ) : user ? (
        <Dashboard user={user} />
      ) : (
        <PublicLandingPage />
      )}

      <Footer />
    </main>
  );
}
