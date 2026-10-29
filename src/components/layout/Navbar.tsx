
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type Theme = "light" | "dark";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  // Restore the user's theme preference.
  useEffect(() => {
    const savedTheme = localStorage.getItem("gradbridge-theme");
    const initialTheme: Theme = savedTheme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("gradbridge-theme", nextTheme);
  }

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!active) return;

        if (response.ok) {
          const user = data.user ?? data;
          setLoggedIn(true);
          setName(user.fullName ?? "");
          setRole(user.role ?? "");
        } else {
          setLoggedIn(false);
          setName("");
          setRole("");
        }
      } catch {
        if (active) {
          setLoggedIn(false);
          setName("");
          setRole("");
        }
      }
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
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
      setRole("");
      setMenuOpen(false);

      router.push("/login");
      router.refresh();
    } catch {
      window.alert("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/alumni", label: "Alumni Directory" },
    ...(loggedIn
      ? role === "Admin"
        ? [{ href: "/admin", label: "Admin Dashboard" }]
        : [
            { href: "/requests", label: "My Requests" },
            { href: "/profile", label: "My Profile" },
          ]
      : []),
  ];

  function isActive(href: string) {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50"
    >
      {theme === "light" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-7">
        

<Link
  href="/"
  className="flex shrink-0 items-center"
  aria-label="GradBridge home"
>
  <Image
    src="/gradbridge-logo.png"
    alt="GradBridge — Connect, Learn, Grow"
    width={1481}
    height={438}
    priority
    className="h-auto w-[155px] sm:w-[190px]"
  />
</Link>



        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isActive(link.href)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {loggedIn ? (
            <>
              <div className="flex max-w-44 items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  {name.trim().charAt(0).toUpperCase() || "U"}
                </span>
                <span className="truncate text-sm font-semibold text-slate-700">
                  {name || "My account"}
                </span>
              </div>

              <button
                onClick={() => void logout()}
                disabled={loggingOut}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-60"
              >
                {loggingOut ? "Logging out..." : "Log out"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
              >
                Get started <span aria-hidden="true">→</span>
              </Link>
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {themeButton}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 md:hidden"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {loggedIn ? (
              <>
                <div className="mt-2 border-t border-slate-100 pt-3 text-sm text-slate-500">
                  Signed in as{" "}
                  <span className="font-semibold text-slate-800">
                    {name || "User"}
                  </span>
                  {role && (
                    <span className="ml-2 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
                      {role}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => void logout()}
                  disabled={loggingOut}
                  className="mt-2 rounded-xl bg-slate-900 px-4 py-3 text-left text-sm font-semibold text-white disabled:opacity-60"
                >
                  {loggingOut ? "Logging out..." : "Log out"}
                </button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
