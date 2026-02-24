export const metadata = {
  title: "Clear Mind Life Apps Ecosystem",
  description: "Identity Threat Scanning & Clinical AI Orchestration",
};

import Hero from "./hero";
import AppList from "@/components/app-list";
import Cta from "@/components/cta-alternative";

export default function Apps() {
  return (
    <>
      <Hero />
      <AppList />
      <Cta
        heading="Extend Clear Mind Life into your Vertical"
        buttonText="View Integrations API"
        buttonLink="#0"
      />
    </>
  );
}
