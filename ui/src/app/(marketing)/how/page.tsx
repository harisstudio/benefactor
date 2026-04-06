import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getSteps, getFeatures } from "@/lib/api";

export const metadata: Metadata = {
  title: "How Benefactor Works",
  description:
    "From creating your campaign to receiving funds, we make every step simple, transparent, and secure.",
};

export default async function HowPage() {
  const steps = await getSteps();
  const features = await getFeatures();
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-navy to-[#1a4a63] text-white py-16 md:py-24">
        <div className="max-w-container mx-auto px-5 text-center">
          <h1 className="text-heading text-white">How Benefactor Works</h1>
          <p className="mt-4 text-subtext text-gray-300 max-w-2xl mx-auto">
            From creating your campaign to receiving funds, we make every step
            simple, transparent, and secure.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-20">
        <div className="max-w-container mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-[2.5rem] mb-12">
            Start fundraising in 3 simple steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <Card key={step.number} hover className="p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-primary-yellow text-primary-navy flex items-center justify-center text-xl font-bold mx-auto mb-5 font-heading">
                  {step.number}
                </div>
                <h3 className="text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-text-gray leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-bg-off-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="text-2xl md:text-[2.5rem] text-center mb-12">
            Why people choose Benefactor
          </h2>
          <div className="space-y-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-5 bg-white rounded-md shadow-sm p-6"
              >
                <span className="text-3xl flex-shrink-0 mt-0.5">
                  {feature.emoji}
                </span>
                <div>
                  <h4 className="text-base font-bold text-primary-navy mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-text-gray leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="text-2xl md:text-[2.5rem] mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-base text-text-gray mb-8">
            It takes just a few minutes to start your fundraiser and share it
            with the world.
          </p>
          <Link
            href="/start"
            className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-bold bg-primary-yellow text-primary-navy shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all"
          >
            Start a Benefactor
          </Link>
        </div>
      </section>
    </>
  );
}
