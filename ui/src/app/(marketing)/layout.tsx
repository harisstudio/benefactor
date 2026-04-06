import { SimpleNavbar } from "@/components/layout/simple-navbar";
import { SimpleFooter } from "@/components/layout/simple-footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SimpleNavbar />
      <main className="flex-1">{children}</main>
      <SimpleFooter />
    </>
  );
}
