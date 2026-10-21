
"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProfileData = {
  fullName: string;
  email: string;
  role: "Student" | "Alumni";
  graduationYear: number;
  jobTitle: string;
  company: string;
  industry: string;
  techStack: string;
  bio: string;
  careerGoals: string;
};

const initialData: ProfileData = {
  fullName: "",
  email: "",
  role: "Student",
  graduationYear: new Date().getFullYear(),
  jobTitle: "",
  company: "",
  industry: "",
  techStack: "",
  bio: "",
  careerGoals: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState<ProfileData>(initialData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok) {
          router.replace("/login");
          return;
        }

        const user = data.user ?? data;
        const profile = user.profile ?? {};

        setForm({
          fullName: user.fullName ?? "",
          email: user.email ?? "",
          role: user.role ?? "Student",
          graduationYear:
            profile.graduationYear ?? new Date().getFullYear(),
          jobTitle: profile.jobTitle ?? "",
          company: profile.company?.name ?? "",
          industry: profile.industry?.name ?? "",
          techStack: profile.techStack ?? "",
          bio: profile.bio ?? "",
          careerGoals: profile.careerGoals ?? "",
        });
      } catch {
        setError("Could not load your profile. Check the server.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  function updateField(
    field: keyof ProfileData,
    value: string | number
  ) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          graduationYear: Number(form.graduationYear),
          jobTitle: form.jobTitle,
          company: form.company,
          industry: form.industry,
          techStack: form.techStack,
          bio: form.bio,
          careerGoals: form.careerGoals,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to save your profile.");
      }

      setMessage("Your profile has been saved successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center text-slate-600">
        Loading your profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-indigo-700">
          ← Back to home
        </Link>

        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            GradBridge
          </p>
          <h1 className="mt-2 text-3xl font-bold">My profile</h1>
          <p className="mt-2 text-slate-600">
            Keep your academic and career information up to date.
          </p>

          {error && (
            <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {message && (
            <p className="mt-5 rounded-xl bg-green-50 p-3 text-sm text-green-700">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full name
              </label>
              <input
                className={inputClass}
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                minLength={2}
                maxLength={100}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email address
              </label>
              <input
                className={`${inputClass} bg-slate-100`}
                value={form.email}
                readOnly
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Account type
              </label>
              <input
                className={`${inputClass} bg-slate-100`}
                value={form.role}
                readOnly
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Graduation year
              </label>
              <input
                className={inputClass}
                type="number"
                min={2000}
                max={2100}
                value={form.graduationYear}
                onChange={(e) =>
                  updateField("graduationYear", e.target.value)
                }
                required
              />
            </div>

            {form.role === "Alumni" ? (
              <>
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Current job title
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Software Engineer"
                    value={form.jobTitle}
                    onChange={(e) =>
                      updateField("jobTitle", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Company
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Microsoft"
                    value={form.company}
                    onChange={(e) =>
                      updateField("company", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Industry
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Cloud Computing"
                    value={form.industry}
                    onChange={(e) =>
                      updateField("industry", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Skills and tech stack
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Python, React, Azure, SQL"
                    value={form.techStack}
                    onChange={(e) =>
                      updateField("techStack", e.target.value)
                    }
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Career goals
                </label>
                <textarea
                  className={inputClass}
                  rows={3}
                  maxLength={1000}
                  placeholder="What roles, skills or industries interest you?"
                  value={form.careerGoals}
                  onChange={(e) =>
                    updateField("careerGoals", e.target.value)
                  }
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                About me
              </label>
              <textarea
                className={inputClass}
                rows={4}
                maxLength={1000}
                placeholder="Introduce yourself..."
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
