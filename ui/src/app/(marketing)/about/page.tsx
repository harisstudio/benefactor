import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { getImpactStats, getValues } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Benefactor",
  description:
    "Learn about Benefactor's mission to help people help each other. The world's most trusted fundraising platform.",
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
            We&rsquo;re on a mission to help people help each other. Benefactor
            is the world&rsquo;s most trusted fundraising platform.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-5 space-y-8">
          <div>
            <h2 className="text-2xl md:text-[2.5rem] mb-4">Our Story</h2>
            <p className="text-base text-text-gray leading-relaxed">
              Benefactor was founded with a simple belief: that the generosity of
              everyday people has the power to change lives. Since our founding,
              we have helped millions of people raise billions for the causes and
              people that matter most to them.
            </p>
            <p className="mt-4 text-base text-text-gray leading-relaxed">
              Whether it&rsquo;s a community coming together to rebuild after a
              disaster, a family rallying support for medical bills, or a student
              raising funds for education &mdash; Benefactor is the platform that
              connects compassion with action.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-[2.5rem] mb-4">What We Do</h2>
            <p className="text-base text-text-gray leading-relaxed">
              Benefactor provides the tools, technology, and trust to make online
              fundraising accessible to everyone. With a 0% platform fee,
              industry-leading donor protections, and a global reach spanning 19
              countries, we make it easy for anyone to make a meaningful impact.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-bg-off-white py-16 md:py-20">
        <div className="max-w-container mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-[2.5rem] mb-3">Our Impact</h2>
          <p className="text-base text-text-gray max-w-2xl mx-auto mb-12">
            Every day, thousands of people use Benefactor to turn compassion into
            action. Here&rsquo;s the impact our community has made together.
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
