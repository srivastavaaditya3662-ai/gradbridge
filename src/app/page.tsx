
const alumni = [
  {
    name: "Aarav Sharma",
    role: "Software Engineer",
    company: "Microsoft",
    year: "2023",
    initials: "AS",
    color: "bg-blue-100 text-blue-700",
    tags: ["React", "TypeScript", "Azure"],
  },
  {
    name: "Priya Verma",
    role: "Machine Learning Engineer",
    company: "Google",
    year: "2022",
    initials: "PV",
    color: "bg-violet-100 text-violet-700",
    tags: ["Python", "Machine Learning", "TensorFlow"],
  },
  {
    name: "Rohan Gupta",
    role: "Data Analyst",
    company: "Deloitte",
    year: "2024",
    initials: "RG",
    color: "bg-emerald-100 text-emerald-700",
    tags: ["SQL", "Python", "Power BI"],
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore alumni by company, industry, graduation year, and technical skills.",
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Find graduates whose experience matches your interests and career goals.",
  },
  {
    number: "03",
    title: "Grow",
    description:
      "Reach out for career guidance, professional insights, and referral opportunities.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <header className="border-b border-slate-200/80 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              G
            </span>
            <span className="text-xl font-bold tracking-tight">
              Grad<span className="text-blue-600">Bridge</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#" className="text-blue-600">Home</a>
            <a href="#alumni" className="transition hover:text-blue-600">
              Explore Alumni
            </a>
            <a href="#how-it-works" className="transition hover:text-blue-600">
              How It Works
            </a>
          </div>

          <a
            href="#alumni"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Get Started <span aria-hidden="true">→</span>
          </a>
        </nav>
      </header>

      <section className="relative bg-slate-50">
        <div className="pointer-events-none absolute -right-32 -top-36 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Your network. Your next opportunity.
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-[1.1] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Your next chapter starts with a{" "}
              <span className="text-blue-600">connection.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Meet the people who once walked your path. Discover alumni,
              learn from their journeys, and build connections that move your
              career forward.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#alumni"
                className="rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore Alumni <span aria-hidden="true">→</span>
              </a>
              <a
                href="#how-it-works"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                How it works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500">
              <span>✓ Search by industry</span>
              <span>✓ Discover career paths</span>
              <span>✓ Request referrals</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-100 to-indigo-100 opacity-80 blur-2xl" />
            <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-300/40 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Alumni network
                  </p>
                  <h2 className="mt-1 text-xl font-bold">Find your people</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                  ✦
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5 shrink-0 text-slate-400"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>
                <span className="text-sm text-slate-400">
                  Try “Software Engineer”
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {alumni.map((person) => (
                  <div
                    key={person.name}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${person.color}`}
                    >
                      {person.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-800">
                        {person.name}
                      </p>
                      <p className="truncate text-sm text-slate-500">
                        {person.role} · {person.company}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {person.year}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-blue-600 p-4 text-white">
                <p className="text-sm font-medium text-blue-100">
                  A little closer to your goals
                </p>
                <p className="mt-1 text-lg font-semibold">
                  Your community can open new doors.
                </p>
              </div>
            </div>

            <div className="absolute -right-3 top-16 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:block">
              <p className="text-xs text-slate-500">Built for your future</p>
              <p className="mt-1 font-bold text-blue-700">Connect. Learn. Grow.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-9 sm:grid-cols-3 lg:px-10">
          <div className="text-center sm:text-left">
            <p className="text-2xl font-bold text-slate-900">
              One community
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Students and graduates, connected
            </p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-2xl font-bold text-slate-900">
              Career-focused
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Real-world roles, skills, and industries
            </p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-2xl font-bold text-slate-900">
              Built for growth
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Guidance and meaningful connections
            </p>
          </div>
        </div>
      </section>

      <section
        id="alumni"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              People to learn from
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Meet our featured alumni
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Explore different career paths and discover the skills behind
              them. These are sample profiles for the initial design.
            </p>
          </div>
          <span className="text-sm font-semibold text-blue-600">
            Directory preview →
          </span>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {alumni.map((person) => (
            <article
              key={person.name}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold ${person.color}`}
                >
                  {person.initials}
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  Class of {person.year}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{person.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{person.role}</p>
              <p className="mt-2 text-sm font-semibold text-blue-700">
                {person.company}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {person.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <span className="text-sm font-semibold text-slate-500">
                  Sample profile
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Simple by design
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. A stronger network.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Turn a directory of graduates into a network you can learn from.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <p className="text-sm font-bold tracking-widest text-blue-600">
                  {step.number}
                </p>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="rounded-3xl bg-blue-600 px-7 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your future network starts here.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Discover the people, experiences, and opportunities that can help
            shape your next step.
          </p>
          <a
            href="#alumni"
            className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Explore the community →
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>
            <span className="font-bold text-slate-800">GradBridge</span>
            {" "}— Connecting students and alumni.
          </p>
          <p>Built as a student full-stack project.</p>
        </div>
      </footer>
    </main>
  );
}
