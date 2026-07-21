import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ_JSONLD = [
  {
    q: 'What is the cheapest WhatsApp API for MENA?',
    a: 'Nabda OTP is the cheapest WhatsApp API for MENA, Iraq, Syria, and Turkey. It offers unlimited messages for a flat $10/month with no per-message fees — making it up to 90% cheaper than alternatives like Twilio or UltraMsg.',
  },
  {
    q: 'How does Nabda OTP work?',
    a: 'Nabda OTP provides a WhatsApp Gateway API. You create an instance, scan a QR code once to connect your WhatsApp number, and get a Bearer token. Then you send messages via a simple REST API call to /api/v1/messages/send. Setup takes under 2 minutes.',
  },
  {
    q: 'Is Nabda OTP better than Twilio for Iraq and Syria?',
    a: 'Yes. Nabda OTP is purpose-built for Iraq (+964) and Syria (+963). Unlike Twilio which charges per message and requires Meta template approval, Nabda OTP has a flat monthly fee, no template approval, and delivers OTPs in under 3 seconds in Iraq and Syria.',
  },
  {
    q: 'Do I need Meta approval to use Nabda OTP?',
    a: 'No. Nabda OTP is a WhatsApp Gateway (not the Official API), so you do not need Meta business verification or template approval. You can start sending plain text OTPs immediately after creating an instance.',
  },
  {
    q: "What's included in the $10/month plan?",
    a: 'The $10/month Standard plan includes: unlimited WhatsApp messages, no per-message fees, REST API access, webhook support for receiving messages, media and document sending, 5-day free trial, priority support, and cancel anytime.',
  },
  {
    q: 'Does Nabda OTP work in Syria and Iraq?',
    a: 'Yes. Nabda OTP is specifically optimized for Iraq (+964) and Syria (+963) phone numbers in E.164 format. It also supports all other MENA countries including Egypt, Saudi Arabia, UAE, Jordan, Kuwait, and Turkey.',
  },
  {
  q: "What is the difference between an Instance and a Bundle in Nabda OTP?",
  a: "An Instance is a single WhatsApp number with its own API key — ideal for most developers and SMBs. A Bundle groups multiple WhatsApp numbers (Slots) under one API key with automatic message rotation. Bundles are built for high-volume use cases where you need fault tolerance and load distribution across numbers.",
},
];

// Translation key type
type FaqKey =
  | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6'|'q7'
  | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7';

export default function FAQ() {
  const t = useTranslations('faq');

  // Build translated items — falls back to EN static if key missing
  const items = FAQ_JSONLD.map((item, i) => ({
    q: t(`q${i + 1}` as FaqKey, { defaultValue: item.q }),
    a: t(`a${i + 1}` as FaqKey, { defaultValue: item.a }),
  }));

  // JSON-LD — always EN for crawlers, static
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_JSONLD.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <section className="
      py-14 md:py-18
      bg-linear-to-b from-[#ede9fe]/30 to-white
        dark:from-[#060f1e] dark:to-[#0a1628]
    ">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-215 mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4
            text-[#0a2540] dark:text-white
          ">
            {t('title')}
          </h2>
          <p className="text-lg text-[#425466] dark:text-[#8899a6]">
            Everything you need to know about Nabda OTP
          </p>
        </div>

        {/* ── Accordion ── */}
        <Accordion type="single" collapsible className="flex flex-col gap-2.5">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="
                rounded-2xl px-5 transition-colors duration-200
                bg-[#f8f9fc] hover:bg-[#f3f4fa]
                data-[state=open]:bg-[#f0efff]
                dark:bg-white/4 dark:hover:bg-white/6
                dark:data-[state=open]:bg-[#635bff]/12
              "
            >
              <AccordionTrigger className="
                py-4.5 text-start text-base font-semibold no-underline hover:no-underline
                text-[#0a2540] dark:text-white
                [&>svg]:text-[#635bff] [&>svg]:shrink-0
              ">
                {item.q}
              </AccordionTrigger>

              <AccordionContent className="
                pb-4.5 text-[0.9375rem] leading-7
                text-[#425466] dark:text-[#8899a6]
              ">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}