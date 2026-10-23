
import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const instant = false;
export default async function AdminPage() {
  const userId = await getSessionUserId();

  if (!userId) {
    redirect("/login");
  }

  const admin = await prisma.user.findUnique({
    where: { id: userId },
    select: { fullName: true, role: true },
  });

  if (!admin || admin.role !== "Admin") {
    redirect("/");
  }

  const [
    totalUsers,
    totalStudents,
    totalAlumni,
    totalCompanies,
    totalIndustries,
    totalRequests,
    pendingRequests,
    profiles,
    recentRequests,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "Student" } }),
    prisma.user.count({ where: { role: "Alumni" } }),
    prisma.company.count(),
    prisma.industry.count(),
    prisma.request.count(),
    prisma.request.count({ where: { status: "Pending" } }),
    prisma.profile.findMany({
      where: { user: { role: "Alumni" } },
      select: {
        company: { select: { name: true } },
        industry: { select: { name: true } },
      },
    }),
    prisma.request.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        status: true,
        createdAt: true,
        student: { select: { fullName: true } },
        alumni: { select: { fullName: true } },
      },
    }),
  ]);

  const countBy = (values: (string | null)[]) => {
    const counts: Record<string, number> = {};

    for (const value of values) {
      if (value) {
        counts[value] = (counts[value] || 0) + 1;
      }
    }

    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  const companies = countBy(profiles.map((p) => p.company?.name ?? null));
  const industries = countBy(profiles.map((p) => p.industry?.name ?? null));

  const StatCard = ({
    label,
    value,
  }: {
    label: string;
    value: number;
  }) => (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );

  const BarList = ({
    title,
    items,
  }: {
    title: string;
    items: [string, number][];
  }) => {
    const max = Math.max(1, ...items.map((item) => item[1]));

    return (
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-slate-900">{title}</h2>

        {items.length === 0 ? (
          <p className="text-sm text-slate-500">
            No data yet. Add alumni profiles with this information.
          </p>
        ) : (
          <div className="space-y-4">
            {items.slice(0, 6).map(([name, count]) => (
              <div key={name}>
                <div className="mb-1 flex justify-between gap-3 text-sm">
                  <span className="truncate text-slate-700">{name}</span>
                  <span className="font-semibold text-slate-900">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{ width: `${(count / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              GradBridge Administration
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Welcome, {admin.fullName}. Monitor your alumni network here.
            </p>
          </div>

          <a
            href="/"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Back to Home
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Users" value={totalUsers} />
          <StatCard label="Students" value={totalStudents} />
          <StatCard label="Alumni" value={totalAlumni} />
          <StatCard label="Companies" value={totalCompanies} />
          <StatCard label="Industries" value={totalIndustries} />
          <StatCard label="Referral Requests" value={totalRequests} />
          <StatCard label="Pending Requests" value={pendingRequests} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BarList title="Alumni by Company" items={companies} />
          <BarList title="Alumni by Industry" items={industries} />
        </div>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Recent Referral Requests
          </h2>

          {recentRequests.length === 0 ? (
            <p className="text-sm text-slate-500">
              No referral requests have been submitted yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-3 pr-4">Student</th>
                    <th className="py-3 pr-4">Alumni</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((request) => (
                    <tr key={request.id} className="border-b border-slate-100">
                      <td className="py-3 pr-4">{request.student.fullName}</td>
                      <td className="py-3 pr-4">{request.alumni.fullName}</td>
                      <td className="py-3 pr-4">{request.status}</td>
                      <td className="py-3">
                        {request.createdAt.toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
