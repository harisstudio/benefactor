import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const CheckoutCard = dynamic(
  () => import("@/components/checkout/checkout-card").then((m) => m.CheckoutCard)
);

export const metadata: Metadata = {
  title: "Checkout — Benefactor",
  description: "Complete your donation securely on Benefactor.",
};

export default function CheckoutPage() {
  return (
    <div className="py-8 md:py-12">
      <div className="max-w-[648px] mx-auto px-5">
        <CheckoutCard />

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <Link href="/">
            <Image src="/assets/logo.svg" alt="Benefactor" width={120} height={24} />
          </Link>
          <p className="text-xs text-text-gray">World Wide Fundraising Platform</p>
        </div>
      </div>
    </div>
  );
}
