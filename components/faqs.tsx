import Accordion from "@/components/accordion";

export default function Faqs() {
  const faqs = [
    {
      question: "What is Clear Mind Life?",
      answer:
        "Clear Mind Life is an end-to-end healthcare AI platform that automates patient intake, scheduling, and care routing using a custom Agentic UI.",
      active: true,
    },
    {
      question: "Is patient data secure and HIPAA-compliant?",
      answer:
        "Yes, security is our top priority. We are fully HIPAA-compliant and integrate directly with your existing EHR systems via FHIR, HL7, and X12, ensuring patient PHI is always protected.",
    },
    {
      question: "Can I integrate with my existing EHR system?",
      answer:
        "Absolutely. Clear Mind Life provides out-of-the-box integrations for Epic, Cerner, and other major EHRs using standard FHIR APIs, so you don't have to rip and replace your current infrastructure.",
    },
    {
      question: "How does the AI Patient Triage work?",
      answer:
        "Our AI Triage system analyzes patient symptoms and medical history in real-time, matching them with the right provider and urgency level before they even book an appointment.",
    },
    {
      question: "What happens if I exceed the Monthly Patient Limit?",
      answer:
        "The Standard plan covers up to 10,000 unique patient interactions per month. If you anticipate higher volume, our Advanced plan offers unlimited interactions along with early access to our Live Benchmark Framework.",
    },
    {
      question: "Do you offer a sandbox for testing?",
      answer:
        "Yes, both of our plans include access to a developer sandbox with synthetic patient data generation, allowing your team to test integrations safely before going live.",
    },
  ];

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="text-3xl font-bold md:text-4xl">
              Questions we often get
            </h2>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  title={faq.question}
                  id={`faqs-${index}`}
                  active={faq.active}
                >
                  {faq.answer}
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
