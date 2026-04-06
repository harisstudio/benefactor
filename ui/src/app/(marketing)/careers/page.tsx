import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getPerks, getRoles } from "@/lib/api";

export const metadata: Metadata = {
  title: "Careers — Join the Benefactor Team",
  description:
    "Help us build technology that empowers people to help each other. View open positions at Benefactor.",
};

export default async function CareersPage() {
  const perks = await getPerks();
  const roles = await getRoles();
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-navy to-[#1a4a63] text-white py-16 md:py-24">
        <div className="max-w-container mx-auto px-5 text-center">
          <h1 className="text-heading text-white">
            Join the{" "}
            <span className="text-primary-yellow">Benefactor</span> Team
          </h1>
          <p className="mt-4 text-subtext text-gray-300 max-w-2xl mx-auto">
            Help us build technology that empowers people to help each other.
            We&rsquo;re looking for passionate people to join our mission.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 md:py-20">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-[2.5rem] text-center mb-12">
            Why work at Benefactor?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <Card key={perk.title} hover className="p-8 text-center">
                <span className="text-4xl block mb-4">{perk.emoji}</span>
                <h3 className="text-lg mb-2">{perk.title}</h3>
                <p className="text-sm text-text-gray leading-relaxed">
                  {perk.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-bg-off-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="text-2xl md:text-[2.5rem] text-center mb-12">
            Open Positions
          </h2>
          <div className="space-y-4">
            {roles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-md shadow-sm p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary-navy">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-text-gray">
                    <span>
                      {role.departmentEmoji} {role.department}
                    </span>
                    <span>
                      {role.locationEmoji} {role.location}
                    </span>
                    <span>&#9200; {role.type}</span>
                  </div>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center h-10 px-5 rounded-btn text-sm font-bold bg-primary-yellow text-primary-navy hover:brightness-110 transition-all min-w-[44px] whitespace-nowrap"
                >
                  Apply &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture CTA */}
      <section className="py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="text-2xl md:text-[2.5rem] mb-4">
            Don&rsquo;t see your role?
          </h2>
          <p className="text-base text-text-gray mb-8">
            We&rsquo;re always looking for talented and passionate people. Send
            us your CV and tell us how you&rsquo;d like to contribute to
            Benefactor&rsquo;s mission.
          </p>
          <a
            href="mailto:careers@benefactor.com"
            className="inline-flex items-center justify-center h-12 px-8 rounded-btn font-bold bg-primary-yellow text-primary-navy shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
