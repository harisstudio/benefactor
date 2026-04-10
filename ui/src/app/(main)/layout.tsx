import { FullNavbar } from "@/components/layout/full-navbar";
import { GlobalFooter } from "@/components/layout/footer/index";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FullNavbar alwaysShowLogo />
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </>
  );
}
