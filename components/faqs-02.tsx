import Accordion from "@/components/accordion";

export default function Faqs() {
  const gettingStarted = [
    {
      question: "How does Clear Mind Life connect to my existing EHR?",
      answer:
        "We connect via standard FHIR R4 APIs — no rip-and-replace required. For Epic, Cerner, and Athena, we use OAuth 2.0 SMART on FHIR tokens. For legacy PM systems, we offer an HL7 v2 bridge. Most practices are live within 14 days.",
    },
    {
      question: "What EDI transaction standards do you support?",
      answer:
        "We support the full HIPAA EDI suite: X12 270/271 (eligibility), X12 278 (prior authorization), X12 837P/I (professional and institutional claims), X12 835 (remittance advice), and X12 277 (claim status). All transactions are routed through Availity or your existing clearinghouse.",
    },
    {
      question: "How long does onboarding take?",
      answer:
        "For a standard 5-provider practice, onboarding takes 10–14 business days. This includes EHR API credentialing, payer enrollment verification, staff training on the review workflow, and a parallel-run period where we scrub claims alongside your existing process before going live.",
    },
    {
      question: "Do I need to replace my existing practice management system?",
      answer:
        "No. Clear Mind Life is an orchestration layer, not a replacement. We sit on top of your existing PM system and EHR, reading and writing data via APIs. Your staff continues using the tools they know — we eliminate the manual steps between them.",
    },
    {
      question: "Is my patient data safe? Where is PHI stored?",
      answer:
        "PHI is never stored in our LLM layer. We enforce strict PHI scrubbing before any data touches an AI model. Patient data at rest is encrypted with AES-256 in HIPAA-compliant infrastructure (AWS GovCloud). We execute a Business Associate Agreement (BAA) with every customer before go-live.",
    },
  ];

  const billingClaims = [
    {
      question: "How does the denial prediction engine work?",
      answer:
        "Our ML model is trained on 10M+ historical 835 remittance lines across UHC, Aetna, BCBS, Cigna, and Medicaid. Before each 837 claim is submitted, the engine simulates payer adjudication against 2.3M NCCI Procedure-to-Procedure edit pairs and payer-specific LCD/NCD policies. Claims scoring below 95% confidence are flagged for human review with a specific fix recommendation.",
    },
    {
      question: "Which payers do you support?",
      answer:
        "We support all major commercial payers (UnitedHealthcare, Aetna, BCBS, Cigna, Humana), all 50 state Medicaid programs, Medicare FFS, and Medicare Advantage plans. Payer-specific rule sets are updated quarterly when CMS releases new NCCI edit tables.",
    },
    {
      question: "Can I still manually review claims before submission?",
      answer:
        "Yes — and we encourage it. Claims above 98% confidence are queued for one-click approval. Claims between 85–98% are flagged with the specific rule violation and a suggested fix. Claims below 85% are held for full human review. You control the confidence thresholds.",
    },
    {
      question: "How do you handle ERA/835 reconciliation?",
      answer:
        "When a payer returns an 835 remittance, our agent automatically matches each payment line to the original 837 claim, calculates contractual adjustments, and flags underpayments. Underpayments above your configured threshold trigger an automatic secondary billing or appeal workflow.",
    },
    {
      question: "What happens when a claim is denied despite pre-scrubbing?",
      answer:
        "The denial triggers an automatic appeal workflow. The agent pulls the denial reason code (CARC/RARC), drafts a clinically rigorous appeal letter citing the specific payer guideline, and queues it for provider signature. For CO-4 and CO-97 denials (bundling/unbundling), the agent auto-corrects the modifier and resubmits within 24 hours.",
    },
  ];

  const securityCompliance = [
    {
      question: "Are you HIPAA compliant?",
      answer:
        "Yes. Clear Mind Life is fully HIPAA compliant. We maintain a comprehensive HIPAA Security Rule program including annual risk assessments, workforce training, technical safeguards (encryption, access controls, audit logging), and physical safeguards for all infrastructure.",
    },
    {
      question: "Do you execute a Business Associate Agreement (BAA)?",
      answer:
        "Yes — a BAA is required and executed before any PHI is processed. We do not allow any customer to go live without a signed BAA in place. Our BAA covers all subprocessors including our cloud infrastructure provider and any AI model vendors.",
    },
    {
      question: "How does PHI scrubbing work before LLM routing?",
      answer:
        "Before any clinical text reaches an LLM, our PHI scrubbing pipeline identifies and redacts 18 HIPAA Safe Harbor identifiers (names, dates, geographic data, phone numbers, etc.) using a combination of regex patterns and a fine-tuned NER model. The scrubbed text is what the LLM sees — the original PHI never leaves your infrastructure.",
    },
    {
      question: "What security certifications do you hold?",
      answer:
        "We are SOC 2 Type II certified (audited annually by an independent CPA firm), HIPAA compliant, and operate under a HITRUST CSF framework. Our infrastructure partners (AWS GovCloud) hold FedRAMP High authorization. Penetration testing is conducted quarterly by an independent third party.",
    },
    {
      question: "How do you prevent AI hallucinations in clinical documentation?",
      answer:
        "Every AI-generated SOAP note, ICD-10 code suggestion, and CPT code is presented to the provider for review before it enters the EHR. We enforce a human-in-the-loop gate on all clinical outputs. Additionally, our code suggestions are cross-referenced against the ground-truth CMS code database (74,719 ICD-10 codes, 15,804 CPT RVU records) to prevent fabricated codes.",
    },
  ];

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-3xl space-y-12">

            {/* Getting Started */}
            <div>
              <h2 className="mb-5 text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🚀</span> Getting Started
              </h2>
              <div className="space-y-2">
                {gettingStarted.map((faq, index) => (
                  <Accordion key={index} title={faq.question} id={`gs-${index}`}>
                    {faq.answer}
                  </Accordion>
                ))}
              </div>
            </div>

            {/* Billing & Claims */}
            <div>
              <h2 className="mb-5 text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">💳</span> Billing &amp; Claims
              </h2>
              <div className="space-y-2">
                {billingClaims.map((faq, index) => (
                  <Accordion key={index} title={faq.question} id={`bc-${index}`}>
                    {faq.answer}
                  </Accordion>
                ))}
              </div>
            </div>

            {/* Security & Compliance */}
            <div>
              <h2 className="mb-5 text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🛡️</span> Security &amp; Compliance
              </h2>
              <div className="space-y-2">
                {securityCompliance.map((faq, index) => (
                  <Accordion key={index} title={faq.question} id={`sc-${index}`}>
                    {faq.answer}
                  </Accordion>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
