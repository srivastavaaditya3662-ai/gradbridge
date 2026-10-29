
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [graduationYear, setGraduationYear] = useState("2030");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role,
          graduationYear: Number(graduationYear),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Registration failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setMessage("Unable to contact the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg md:grid-cols-2">
          <section className="hidden flex-col justify-between bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 p-10 text-white md:flex">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                Join the community
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Your next opportunity could start with a connection.
              </h1>
              <p className="mt-5 leading-7 text-slate-200">
                Discover alumni, learn from their experiences, and build
                meaningful professional relationships through GradBridge.
              </p>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              One community. More possibilities.
            </p>
          </section>

          <section className="p-6 sm:p-10">
            <Link href="/" className="text-sm font-semibold text-blue-800">
              GradBridge
            </Link>

            <h2 className="mt-6 text-3xl font-bold text-slate-950">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Join the student and alumni community.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-900">
                  Full name
                </label>
                <input
                  id="fullName"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-900">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-900">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={72}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
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
                  <option value="Student">Student</option>
                  <option value="Alumni">Alumni</option>
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

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-800 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-900 disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            {message && (
              <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-900">
                {message}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-slate-700">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-blue-800 hover:underline">
                Log in
              </Link>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
