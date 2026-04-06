import { DashboardNavbar } from "@/components/layout/dashboard-navbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      <main className="flex-1">{children}</main>
    </>
  );
}
