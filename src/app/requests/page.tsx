
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RequestItem = {
  id: string;
  message: string;
  reply: string | null;
  status: string;
  createdAt: string;
  studentId: string;
  alumniId: string;
  student?: { id: string; fullName: string };
  alumni?: { id: string; fullName: string };
};

export default function RequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [meResponse, requestsResponse] = await Promise.all([
        fetch("/api/auth/me", { cache: "no-store" }),
        fetch("/api/requests", { cache: "no-store" }),
      ]);

      if (meResponse.status === 401 || requestsResponse.status === 401) {
        router.replace("/login");
        return;
      }

      const meData = await meResponse.json();
      const requestData = await requestsResponse.json();

      if (!meResponse.ok) {
        throw new Error(meData.message ?? "Unable to load account.");
      }

      if (!requestsResponse.ok) {
        throw new Error(
          requestData.message ?? requestData.error ?? "Unable to load requests."
        );
      }

      const currentUser = meData.user ?? meData;
      setRole(currentUser.role ?? "");

      setRequests(
        Array.isArray(requestData)
          ? requestData
          : requestData.requests ?? []
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load requests."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  async function updateRequest(
    requestId: string,
    status: "Accepted" | "Rejected"
  ) {
    setUpdatingId(requestId);
    setError("");

    try {
      const response = await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status }),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ?? data.error ?? "Unable to update request."
        );
      }

      await loadRequests();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update request."
      );
    } finally {
      setUpdatingId("");
    }
  }

  async function sendReply(requestId: string) {
    const reply = (replyDrafts[requestId] ?? "").trim();

    if (!reply) {
      setError("Please write a reply before sending.");
      return;
    }

    if (reply.length > 500) {
      setError("Your reply must be 500 characters or fewer.");
      return;
    }

    setUpdatingId(requestId);
    setError("");

    try {
      const response = await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, reply }),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to send reply.");
      }

      setReplyDrafts((previous) => ({
        ...previous,
        [requestId]: "",
      }));

      await loadRequests();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to send reply."
      );
    } finally {
      setUpdatingId("");
    }
  }

  const visibleRequests = requests.filter((item) =>
    role === "Alumni"
      ? item.alumniId === item.alumni?.id || item.alumniId
      : item.studentId === item.student?.id || item.studentId
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-semibold text-indigo-700">
          ← Back to home
        </Link>

        <h1 className="mt-5 text-3xl font-bold">Referral requests</h1>

        <p className="mt-3 text-slate-600">
          {role === "Alumni"
            ? "Review connection requests from students and reply to them."
            : "Track your referral requests and read replies from alumni."}
        </p>

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-12 text-center text-slate-600">
            Loading requests...
          </p>
        ) : visibleRequests.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold">No requests yet</h2>

            <p className="mt-2 text-slate-600">
              {role === "Alumni"
                ? "Student referral requests will appear here."
                : "Visit the alumni directory to find someone to connect with."}
            </p>

            {role === "Student" && (
              <Link
                href="/alumni"
                className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Explore alumni
              </Link>
            )}
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {visibleRequests.map((item) => {
              const person =
                role === "Alumni"
                  ? item.student?.fullName ?? "Student"
                  : item.alumni?.fullName ?? "Alumni";

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold">{person}</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {role === "Alumni" ? "Student" : "Alumni"} ·{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {role === "Alumni" ? "Student's message" : "Your message"}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-slate-700">
                      {item.message}
                    </p>
                  </div>

                  {role === "Student" && item.reply && (
                    <div className="mt-4 rounded-xl bg-indigo-50 p-4">
                      <p className="font-semibold text-indigo-900">
                        Alumni reply
                      </p>
                      <p className="mt-2 whitespace-pre-wrap text-indigo-800">
                        {item.reply}
                      </p>
                    </div>
                  )}

                  {role === "Alumni" && (
                    <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                      {item.reply && (
                        <div className="rounded-xl bg-green-50 p-4">
                          <p className="font-semibold text-green-900">
                            Your previous reply
                          </p>
                          <p className="mt-2 whitespace-pre-wrap text-green-800">
                            {item.reply}
                          </p>
                        </div>
                      )}

                      <label
                        htmlFor={`reply-${item.id}`}
                        className="block font-semibold text-slate-800"
                      >
                        Write a reply to the student
                      </label>

                      <textarea
                        id={`reply-${item.id}`}
                        value={replyDrafts[item.id] ?? ""}
                        onChange={(event) =>
                          setReplyDrafts((previous) => ({
                            ...previous,
                            [item.id]: event.target.value,
                          }))
                        }
                        maxLength={500}
                        rows={3}
                        placeholder="Write your response here..."
                        className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      />

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-sm text-slate-500">
                          {(replyDrafts[item.id] ?? "").length}/500 characters
                        </span>

                        <button
                          onClick={() => void sendReply(item.id)}
                          disabled={updatingId === item.id}
                          className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {updatingId === item.id
                            ? "Sending..."
                            : item.reply
                              ? "Update reply"
                              : "Send reply"}
                        </button>
                      </div>
                    </div>
                  )}

                  {role === "Alumni" && item.status === "Pending" && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() => void updateRequest(item.id, "Accepted")}
                        disabled={updatingId === item.id}
                        className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                      >
                        {updatingId === item.id ? "Updating..." : "Accept"}
                      </button>

                      <button
                        onClick={() => void updateRequest(item.id, "Rejected")}
                        disabled={updatingId === item.id}
                        className="rounded-xl border border-red-200 px-4 py-2 font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
