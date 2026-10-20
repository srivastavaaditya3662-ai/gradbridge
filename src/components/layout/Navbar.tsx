
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            G
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Grad<span className="text-blue-600">Bridge</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="transition hover:text-blue-600">
            Home
          </Link>
          <Link href="/alumni" className="transition hover:text-blue-600">
            Explore Alumni
          </Link>
          <Link href="/requests" className="transition hover:text-blue-600">
            Requests
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
