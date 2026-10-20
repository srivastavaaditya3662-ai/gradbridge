
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
      "Explore career journeys and understand how alumni moved into their current roles.",
  },
  {
    number: "03",
    title: "Build connections",
    description:
      "Send concise connection and referral requests to alumni who match your goals.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="relative overflow-hidden bg-slate-50">
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Your network. Your next opportunity.
            </span>

            <h1 className="mt-7 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              Your next chapter starts with a{" "}
              <span className="text-blue-600">connection.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Discover graduates, learn from their professional journeys,
              and build meaningful connections that help move your career
              forward.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/alumni"
                className="rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore Alumni →
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                Join GradBridge
              </Link>
            </div>

            <p className="mt-7 text-sm text-slate-500">
              Career discovery · Alumni connections · Referral opportunities
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              A community built around you
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Turn connections into opportunities.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Search for professionals in your fields of interest, learn
              about their work, and reach out when you need guidance.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Explore different career paths",
                "Find alumni by skills and industry",
                "Build professional connections",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            How GradBridge helps
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            More than a directory.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            A focused platform for discovering alumni, learning from their
            experience, and creating opportunities to connect.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <p className="text-sm font-bold tracking-widest text-blue-600">
                {feature.number}
              </p>
              <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="rounded-3xl bg-blue-600 px-7 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start building your network.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">
            Your next opportunity could begin with a conversation.
          </p>
          <Link
            href="/alumni"
            className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Explore the community →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
