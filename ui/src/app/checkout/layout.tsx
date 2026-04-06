import { CheckoutNavbar } from "@/components/layout/checkout-navbar";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CheckoutNavbar />
      <main className="flex-1 bg-bg-off-white">{children}</main>
    </>
  );
}
