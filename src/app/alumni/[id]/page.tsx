
"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type AlumniProfile = {
  id: string;
  userId: string;
  graduationYear: number;
  jobTitle: string | null;
  techStack: string;
  bio: string;
  user: {
    id: string;
    fullName: string;
    role: string;
  };
  company: { name: string } | null;
  industry: { name: string } | null;
};

export default function AlumniDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<AlumniProfile | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    async function loadPage() {
      try {
        const [profileResponse, meResponse] = await Promise.all([
          fetch(`/api/alumni/${encodeURIComponent(params.id)}`, {
            cache: "no-store",
          }),
          fetch("/api/auth/me", { cache: "no-store" }),
        ]);

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          throw new Error(
            profileData.message ?? "Unable to find this alumni."
          );
        }

        setProfile(profileData.profile ?? profileData);

        if (meResponse.ok) {
          const meData = await meResponse.json();
          const currentUser = meData.user ?? meData;
          setRole(currentUser.role ?? "");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    }

    void loadPage();
  }, [params.id]);

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;

    setSending(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alumniId: profile.user.id,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to send request.");
      }

      setMessage("");
      setSuccess("Your referral request has been sent.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to send request."
      );
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <main className="px-6 py-20 text-center text-slate-600">
        Loading alumni profile...
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Profile unavailable</h1>
        <p className="mt-3 text-slate-600">
          {error || "This alumni profile could not be found."}
        </p>
        <Link
          href="/alumni"
          className="mt-6 inline-block font-semibold text-indigo-700"
        >
          Return to directory
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/alumni"
          className="text-sm font-semibold text-indigo-700"
        >
          ← Back to alumni directory
        </Link>

        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-700">
            {profile.user.fullName.charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {profile.user.fullName}
          </h1>
          <p className="mt-2 text-lg text-indigo-700">
            {profile.jobTitle || "Alumni"}
          </p>

          <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Company</p>
              <p className="mt-1 font-semibold">
                {profile.company?.name || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Industry</p>
              <p className="mt-1 font-semibold">
                {profile.industry?.name || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Graduation year</p>
              <p className="mt-1 font-semibold">
                {profile.graduationYear}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Skills and tech stack</p>
              <p className="mt-1 font-semibold">
                {profile.techStack || "Not specified"}
              </p>
            </div>
          </div>

          <div className="mt-7">
            <h2 className="text-lg font-bold">About</h2>
            <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">
              {profile.bio || "This alumnus has not added a bio yet."}
            </p>
          </div>
        </section>

        {role === "Student" && (
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">Request a referral</h2>
            <p className="mt-2 text-sm text-slate-600">
              Introduce yourself and explain why you are reaching out.
              Keep your message within 160 characters.
            </p>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
            {success && (
              <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {success}
              </p>
            )}

            <form onSubmit={sendRequest} className="mt-4">
              <textarea
                className="w-full rounded-xl border border-slate-300 bg-white p-4 text-slate-950 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                rows={4}
                maxLength={160}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hello! I'm a student interested in your career path..."
              />
              <div className="mt-2 text-right text-sm text-slate-500">
                {message.length}/160
              </div>
              <button
                type="submit"
                disabled={sending || !message.trim()}
                className="mt-4 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send referral request"}
              </button>
            </form>
          </section>
        )}

        {role === "Alumni" && (
          <p className="mt-6 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-800">
            You are signed in as an alumnus. Student referral requests are
            available to Student accounts.
          </p>
        )}
      </div>
    </main>
  );
}
