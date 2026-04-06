import { FullNavbar } from "@/components/layout/full-navbar";
import { Footer } from "@/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FullNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
