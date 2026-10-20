
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Login failed.");
        return;
      }

      router.push("/profile");
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
                Welcome back
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Keep building connections that move you forward.
              </h1>
              <p className="mt-5 leading-7 text-slate-200">
                Discover professional journeys and connect with people who
                can help you grow.
              </p>
            </div>
            <p className="text-sm text-slate-300">
              Reconnect with your community.
            </p>
          </section>

          <section className="p-6 sm:p-10">
            <Link href="/" className="text-sm font-semibold text-blue-800">
              GradBridge
            </Link>

            <h2 className="mt-6 text-3xl font-bold text-slate-950">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Log in to continue to your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-500 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-800 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-900 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            {message && (
              <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-900">
                {message}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-slate-700">
              New to GradBridge?{" "}
              <Link href="/register" className="font-semibold text-blue-800 hover:underline">
                Create an account
              </Link>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
