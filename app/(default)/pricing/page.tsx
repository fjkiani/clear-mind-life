export const metadata = {
  title: "Pricing - Clear Mind Life",
  description: "Simple, transparent pricing for healthcare AI.",
};

import PricingTables from "@/components/pricing-tables";
import ComparePlans from "@/components/compare-plans";
import TestimonialsGrid from "@/components/testimonials-grid";
import Faqs from "@/components/faqs";
import Cta from "@/components/cta-alternative";

export default function Pricing() {
  return (
    <>
      <PricingTables />
      <ComparePlans />
      <TestimonialsGrid />
      <Faqs />
      <Cta
        className="overflow-hidden"
        heading="Stop losing revenue to preventable claim denials"
        buttonText="Open Live Dashboard"
        buttonLink="/dashboard"
      />
    </>
  );
}
