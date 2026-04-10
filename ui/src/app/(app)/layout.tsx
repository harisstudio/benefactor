import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { GlobalFooter } from "@/components/layout/footer/index";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </>
  );
}
