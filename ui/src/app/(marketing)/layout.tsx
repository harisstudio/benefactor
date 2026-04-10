import { SimpleNavbar } from "@/components/layout/simple-navbar";
import { GlobalFooter } from "@/components/layout/footer/index";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SimpleNavbar />
      <main className="flex-1">{children}</main>
      <GlobalFooter />
    </>
  );
}
