import Link from "next/link";
import { FloatingHearts } from "./floating-hearts";

export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden pt-2 pb-0 md:pt-4">
      <FloatingHearts />

      <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center pb-12 md:pb-20">
        <h1 className="text-heading text-primary-navy leading-[1.0] tracking-[-2px] font-[950]">
          World Wide <br />
          Fundraising <br />
          Platform
        </h1>
        <p className="mt-4 text-[clamp(14px,2vw+0.5rem,24px)] text-primary-navy font-bold leading-[1.14]">
          More than $50 million is raised
          <br />
          every week on Benefactor Team.*
        </p>
        <p className="mt-3 text-[clamp(13px,1vw+0.5rem,16px)] text-text-gray max-w-md mx-auto leading-[1.42]">
          Get started in just a few minutes with helpful new tools, it&rsquo;s
          easier than ever to pick the perfect title, write a compelling story,
          and share it with the world.
        </p>
        <Link
          href="/start"
          className="mt-8 inline-flex items-center justify-center h-12 md:h-[52px] px-8 rounded-[30px] font-semibold text-base bg-primary-yellow text-primary-navy shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(255,107,0,0.4)] transition-all"
        >
          Start a Benefactor
        </Link>
      </div>
    </section>
  );
}
