import Link from "next/link";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg-off-white flex flex-col items-center justify-center px-5 py-16 text-center">
      <p className="font-heading text-[clamp(80px,16vw,160px)] font-extrabold text-primary-navy leading-none tracking-[-0.04em]">
        404
      </p>
      <h1 className="font-heading text-[clamp(22px,3vw,32px)] font-extrabold text-primary-navy tracking-[-0.01em] mt-4">
        Page not found
      </h1>
      <p className="text-[15px] text-text-gray max-w-[420px] mt-3 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-[100px] font-bold text-[14px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
        >
          <IconHome size={16} stroke={1.8} />
          Back home
        </Link>
        <Link
          href="/how"
          className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-[100px] font-semibold text-[14px] border border-surface-muted bg-white text-primary-navy hover:bg-bg-off-white transition-all"
        >
          <IconArrowLeft size={16} stroke={1.8} />
          Learn how it works
        </Link>
      </div>
    </main>
  );
}
