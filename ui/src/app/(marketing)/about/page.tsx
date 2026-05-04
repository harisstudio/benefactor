import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { getImpactStats, getValues } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Benefactor",
  description:
    "Benefactor is a fundraising platform built on transparency, simplicity, and trust. No platform fees. Every campaign verified. Learn our story.",
};

export default async function AboutPage() {
  const impactStats = await getImpactStats();
  const values = await getValues();
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-navy to-[#1a4a63] text-white py-16 md:py-24">
        <div className="max-w-container mx-auto px-5 text-center">
          <h1 className="text-heading text-white">About Benefactor</h1>
          <p className="mt-4 text-subtext text-gray-300 max-w-2xl mx-auto">
            We exist to make generosity simple. Benefactor is a fundraising
            platform built on transparency, trust, and zero platform fees.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-5 space-y-8">
          <div>
            <h2 className="text-2xl md:text-[2.5rem] mb-4">Our Story</h2>
            <p className="text-base text-text-gray leading-relaxed">
              Benefactor started with a question we couldn&rsquo;t ignore: why is
              it still so hard for good people to raise money for good causes? We
              saw the friction firsthand &mdash; the distrust, the fees, the
              platforms that took too much and gave too little back. So we built
              something different.
            </p>
            <p className="mt-4 text-base text-text-gray leading-relaxed">
              Whether it&rsquo;s a family facing unexpected costs, a community
              rebuilding after a crisis, or a student chasing an opportunity they
              can&rsquo;t afford alone &mdash; Benefactor exists to close the gap
              between compassion and action.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-[2.5rem] mb-4">What We Do</h2>
            <p className="text-base text-text-gray leading-relaxed">
              We give people the simplest, most transparent way to raise and
              donate money online. No platform fees. Verified campaigns.
              Bank-grade security. And a team that reviews every fundraiser
              before it goes live.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-bg-off-white py-16 md:py-20">
        <div className="max-w-container mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-[2.5rem] mb-3">Our Commitment</h2>
          <p className="text-base text-text-gray max-w-2xl mx-auto mb-12">
            We measure ourselves not by vanity metrics, but by the promises we
            keep to every fundraiser and every donor.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-primary-navy font-heading">
                  {stat.value}
                </span>
                <span className="block mt-2 text-sm text-text-gray">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20">
        <div className="max-w-container mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-[2.5rem] mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} hover className="p-8 text-center">
                <span className="text-4xl block mb-4">{value.emoji}</span>
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-sm text-text-gray leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
