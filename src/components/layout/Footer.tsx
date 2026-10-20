
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div>
          <Link href="/" className="text-lg font-bold text-slate-900">
            Grad<span className="text-blue-600">Bridge</span>
          </Link>
          <p className="mt-1 text-sm text-slate-500">
            Connecting students and alumni.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-slate-500">
          <Link href="/alumni" className="hover:text-blue-600">
            Alumni Directory
          </Link>
          <Link href="/register" className="hover:text-blue-600">
            Join the Network
          </Link>
          <Link href="/login" className="hover:text-blue-600">
            Sign In
          </Link>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} GradBridge
        </p>
      </div>
    </footer>
  );
}
