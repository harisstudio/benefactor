import Link from "next/link";
import { IconCircleCheck, IconArrowLeft } from "@tabler/icons-react";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-5 py-16 bg-bg-off-white">
      <div className="max-w-[520px] w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-yellow/20 mb-5">
          <IconCircleCheck size={36} className="text-primary-navy" stroke={2} />
        </div>
        <h1 className="font-heading text-[clamp(28px,4vw,40px)] font-extrabold text-primary-navy leading-tight mb-3">
          Thank you for your donation!
        </h1>
        <p className="text-[15px] text-text-gray leading-[1.6] mb-8">
          Your contribution helps this campaign reach more people. A receipt has
          been sent to your email.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 h-[48px] px-6 rounded-[100px] font-bold text-[15px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover transition-all"
          >
            <IconArrowLeft size={16} />
            Back home
          </Link>
          <Link
            href="/campaigns/1"
            className="inline-flex items-center h-[48px] px-6 rounded-[100px] font-semibold text-[14px] text-primary-navy bg-white border border-surface-muted hover:bg-bg-off-white transition-all"
          >
            View campaign
          </Link>
        </div>
      </div>
    </main>
  );
}
