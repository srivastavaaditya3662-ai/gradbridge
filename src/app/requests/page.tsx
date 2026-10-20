
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function RequestForm() {
  const searchParams = useSearchParams();
  const alumniId = searchParams.get("alumniId") || "";
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;

    setSubmitted(true);
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/alumni"
          className="text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          ← Back to directory
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
            Build your network
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Request a connection
          </h1>
          <p className="mt-3 leading-7 text-slate-600">
            Introduce yourself, explain what guidance you are looking for, and
            keep your message professional.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
              <h2 className="font-bold text-green-900">
                Demo request submitted
              </h2>
              <p className="mt-2 text-sm leading-6 text-green-800">
                Your form was submitted successfully in this demo. It has not
                been saved to a database or sent to an alumnus yet.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 rounded-xl bg-green-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-900"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="alumniId"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Alumni ID
                </label>
                <input
                  id="alumniId"
                  value={alumniId}
                  readOnly
                  placeholder="Open this form from an alumni profile"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none"
                />
                <p className="mt-2 text-xs text-slate-500">
                  This is a demo identifier. The actual alumni details will be
                  linked through the database later.
                </p>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setSubmitted(false);
                  }}
                  maxLength={160}
                  rows={5}
                  required
                  placeholder="Hi! I am a student interested in your career path. Could you share some advice on preparing for opportunities in your field?"
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-2 text-right text-xs text-slate-500">
                  {message.length}/160 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={!message.trim()}
                className="w-full rounded-xl bg-blue-700 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit request
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default function RequestsPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <main className="min-h-screen bg-slate-50 p-10 text-slate-600">
            Loading request form...
          </main>
        }
      >
        <RequestForm />
      </Suspense>
      <Footer />
    </>
  );
}
