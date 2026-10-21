
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });
        const data = await response.json();

        if (active && response.ok) {
          const user = data.user ?? data;
          setLoggedIn(true);
          setName(user.fullName ?? "");
        } else if (active) {
          setLoggedIn(false);
          setName("");
        }
      } catch {
        if (active) {
          setLoggedIn(false);
          setName("");
        }
      }
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, [pathname]);

  async function logout() {
    setLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      setLoggedIn(false);
      setName("");
      router.push("/login");
      router.refresh();
    } catch {
      window.alert("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  const linkClass = (path: string) =>
    `text-sm font-medium transition ${
      pathname === path
        ? "text-indigo-700"
        : "text-slate-600 hover:text-indigo-700"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-indigo-700">
          GradBridge
        </Link>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/alumni" className={linkClass("/alumni")}>
            Alumni
          </Link>

          {loggedIn && (
            <>
              <Link href="/profile" className={linkClass("/profile")}>
                My profile
              </Link>
              <Link href="/requests" className={linkClass("/requests")}>
                Requests
              </Link>
              <span className="hidden max-w-32 truncate text-sm text-slate-500 md:inline">
                {name}
              </span>
              <button
                onClick={() => void logout()}
                disabled={loggingOut}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          )}

          {!loggedIn && (
            <>
              <Link href="/login" className={linkClass("/login")}>
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
