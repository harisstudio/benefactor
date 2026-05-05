import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const CheckoutCard = dynamic(
  () =>
    import("@/components/checkout/checkout-card").then((m) => m.CheckoutCard)
);

export const metadata: Metadata = {
  title: "Checkout — Benefactor",
  description: "Complete your donation securely on Benefactor.",
};

export default function CheckoutPage() {
  return (
    <>
      <div className="py-6 md:py-10 min-h-[calc(100vh_-_200px)]">
        <div className="max-w-[648px] mx-auto px-3 md:px-5">
          <CheckoutCard />
        </div>
      </div>

      {/* Simple checkout footer matching original */}
      <div className="text-center py-10 px-5">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="Benefactor"
            width={160}
            height={50}
            className="h-[50px] w-auto mx-auto mb-2"
          />
        </Link>
        <p className="text-[13px] text-text-gray font-medium">
          World Wide Fundraising Platform
        </p>
      </div>
    </>
  );
}
