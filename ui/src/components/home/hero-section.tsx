import Link from "next/link";
import { FloatingHearts } from "./floating-hearts";

export function HeroSection() {
  return (
    <section className="relative bg-primary-navy text-white overflow-hidden pt-28 pb-0 md:pt-36">
      <FloatingHearts />

      <div className="relative z-10 max-w-container mx-auto px-5 text-center pb-12 md:pb-20">
        <h1 className="text-heading text-white leading-[1.1] tracking-[-0.02em]">
          World Wide <br />
          Fundraising <br />
          Platform
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          More than $50 million is raised
          <br />
          every week on Benefactor Team.*
        </p>
        <p className="mt-3 text-sm text-gray-400 max-w-md mx-auto">
          Get started in just a few minutes with helpful new tools, it&rsquo;s
          easier than ever to pick the perfect title, write a compelling story,
          and share it with the world.
        </p>
        <Link
          href="/start"
          className="mt-8 inline-flex items-center justify-center h-12 md:h-[52px] px-8 rounded-btn font-bold bg-primary-yellow text-primary-navy shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(255,107,0,0.4)] transition-all"
        >
          Start a Benefactor
        </Link>
      </div>
    </section>
  );
}
