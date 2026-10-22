
"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type ProfileForm = {
  fullName: string;
  email: string;
  role: string;
  graduationYear: string;
  jobTitle: string;
  company: string;
  industry: string;
  techStack: string;
  bio: string;
  careerGoals: string;
};

const emptyForm: ProfileForm = {
  fullName: "",
  email: "",
  role: "",
  graduationYear: "",
  jobTitle: "",
  company: "",
  industry: "",
  techStack: "",
  bio: "",
  careerGoals: "",
};

export default function ProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [pictureVersion, setPictureVersion] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/profile", {
          cache: "no-store",
        });

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load your profile.");
        }

        const user = data.user ?? data;
        const profile = user.profile ?? {};

        setForm({
          fullName: user.fullName ?? "",
          email: user.email ?? "",
          role: user.role ?? "",
          graduationYear: profile.graduationYear
            ? String(profile.graduationYear)
            : "",
          jobTitle: profile.jobTitle ?? "",
          company: profile.company?.name ?? "",
          industry: profile.industry?.name ?? "",
          techStack: profile.techStack ?? "",
          bio: profile.bio ?? "",
          careerGoals: profile.careerGoals ?? "",
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function choosePicture(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setMessage("");
    setError("");

    if (!file) {
      setSelectedFile(null);
      setPreview("");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Choose a JPG, PNG, or WebP image.");
      event.target.value = "";
      setSelectedFile(null);
      setPreview("");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("The image must be 2 MB or smaller.");
      event.target.value = "";
      setSelectedFile(null);
      setPreview("");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function uploadPicture() {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setUploading(true);
    setMessage("");
    setError("");

    try {
      const body = new FormData();
      body.append("picture", selectedFile);

      const response = await fetch("/api/profile/picture", {
        method: "POST",
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to upload your picture.");
      }

      setMessage("Profile picture uploaded successfully.");
      setSelectedFile(null);
      setPreview("");
      setPictureVersion((version) => version + 1);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to upload your picture."
      );
    } finally {
      setUploading(false);
    }
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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
        throw new Error(data.message || "Unable to save your profile.");
      }

      setMessage("Profile saved successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-gray-600">Loading your profile...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          GradBridge
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          My Profile
        </h1>
        <p className="mt-2 text-gray-600">
          Keep your academic and career information up to date.
        </p>
      </div>

      {message && (
        <div
          role="status"
          className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"
        >
          {message}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Profile picture
        </h2>

        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-3xl font-bold text-indigo-700">
            {preview ? (
              <img
                src={preview}
                alt="Selected profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={`/api/profile/picture?v=${pictureVersion}`}
                alt="Your profile"
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="picture"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Choose an image
            </label>

            <input
              id="picture"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={choosePicture}
              disabled={uploading}
              className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
            />

            <p className="mt-2 text-xs text-gray-500">
              JPG, PNG, or WebP. Maximum size: 2 MB.
            </p>

            <button
              type="button"
              onClick={uploadPicture}
              disabled={!selectedFile || uploading}
              className="mt-4 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload picture"}
            </button>
          </div>
        </div>
      </section>

      <form
        onSubmit={saveProfile}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          Personal and career information
        </h2>

        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={updateField}
            required
            maxLength={100}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              value={form.email}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600"
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-medium text-gray-700">
              Account role
            </label>
            <input
              id="role"
              value={form.role}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="graduationYear" className="mb-2 block text-sm font-medium text-gray-700">
            Graduation year
          </label>
          <input
            id="graduationYear"
            name="graduationYear"
            type="number"
            min={1900}
            max={2100}
            value={form.graduationYear}
            onChange={updateField}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {form.role === "Alumni" && (
          <>
            <div>
              <label htmlFor="jobTitle" className="mb-2 block text-sm font-medium text-gray-700">
                Current job title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                value={form.jobTitle}
                onChange={updateField}
                maxLength={150}
                placeholder="e.g. Software Engineer"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={updateField}
                  maxLength={150}
                  placeholder="e.g. Microsoft"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label htmlFor="industry" className="mb-2 block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <input
                  id="industry"
                  name="industry"
                  value={form.industry}
                  onChange={updateField}
                  maxLength={100}
                  placeholder="e.g. Technology"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="techStack" className="mb-2 block text-sm font-medium text-gray-700">
                Skills and tech stack
              </label>
              <textarea
                id="techStack"
                name="techStack"
                value={form.techStack}
                onChange={updateField}
                maxLength={500}
                rows={3}
                placeholder="e.g. Python, React, SQL, Azure"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="bio" className="mb-2 block text-sm font-medium text-gray-700">
            About me
          </label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={updateField}
            maxLength={1000}
            rows={4}
            placeholder="Introduce yourself..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {form.role === "Student" && (
          <div>
            <label htmlFor="careerGoals" className="mb-2 block text-sm font-medium text-gray-700">
              Career goals
            </label>
            <textarea
              id="careerGoals"
              name="careerGoals"
              value={form.careerGoals}
              onChange={updateField}
              maxLength={1000}
              rows={3}
              placeholder="What roles or skills are you working toward?"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {saving ? "Saving..." : "Save profile"}
        </button>
      </form>
    </main>
  );
}
