import SolutionHero from '@/components/solutions/SolutionHero';
import StatsBar from '@/components/solutions/StatsBar';
import FeatureGrid from '@/components/solutions/FeatureGrid';
import SolutionWhySection from '@/components/solutions/SolutionWhySection';
import HowItWorksSteps from '@/components/solutions/HowItWorksSteps';
import CodeExample from '@/components/solutions/CodeExample';
import UseCasesList from '@/components/solutions/UseCasesList';
import SolutionCTA from '@/components/solutions/SolutionCTA';
import { Clock } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAR = locale === 'ar';
  const isTR = locale === 'tr';

  const titles = {
    en: 'Appointment Reminders via WhatsApp — Reduce No-Shows by 67% | Nabda OTP',
    ar: 'تذكيرات المواعيد عبر واتساب — قلل عدم الحضور بنسبة 67% | نبضة OTP',
    tr: 'WhatsApp ile Randevu Hatırlatıcıları — %67 Oranında Devamsızlığı Azaltın | Nabda OTP',
  };

  const descriptions = {
    en: 'Send automated appointment reminders via WhatsApp to patients, clients, and customers in Iraq, Syria & MENA. 98% open rate, 67% reduction in no-shows. Perfect for clinics, salons, dental offices, and service businesses. $10/month unlimited with Nabda OTP.',
    ar: 'أرسل تذكيرات مواعيد تلقائية عبر واتساب للمرضى والعملاء في العراق وسوريا والشرق الأوسط. نسبة فتح 98%، تقليل عدم الحضور بنسبة 67%. مثالي للعيادات والصالونات وعيادات الأسنان. 10 دولار شهرياً غير محدود مع نبضة OTP.',
    tr: 'Irak, Suriye ve MENA\'daki hastalara, müşterilere WhatsApp üzerinden otomatik randevu hatırlatıcıları gönderin. %98 açılma oranı, %67 devamsızlık azalması. Klinikler, kuaförler, diş klinikleri için mükemmel. Nabda OTP ile ayda $10 sınırsız.',
  };

  const title = titles[locale as keyof typeof titles] ?? titles.en;
  const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

  const canonicalPath =
    locale === 'en'
      ? `${BASE_URL}/solutions/appointment-reminders`
      : `${BASE_URL}/${locale}/solutions/appointment-reminders`;

  return {
    title,
    description: desc,
    keywords: 'WhatsApp appointment reminders, reduce no-shows, clinic reminders Iraq, dental appointment WhatsApp, salon booking reminders, Nabda OTP healthcare, patient reminders MENA',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${BASE_URL}/solutions/appointment-reminders`,
        ar: `${BASE_URL}/ar/solutions/appointment-reminders`,
        tr: `${BASE_URL}/tr/solutions/appointment-reminders`,
        'x-default': `${BASE_URL}/solutions/appointment-reminders`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: canonicalPath,
      type: 'website',
      siteName: 'Nabda OTP',
      locale: isAR ? 'ar_SA' : isTR ? 'tr_TR' : 'en_US',
      images: [
        {
          url: `${BASE_URL}/assets/og-appointment-reminders.png`,
          width: 1200,
          height: 630,
          alt: 'Appointment Reminders via WhatsApp — Nabda OTP',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [`${BASE_URL}/assets/og-appointment-reminders.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// JSON-LD 
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Appointment Reminders via WhatsApp',
  description:
    'Automated appointment reminders via WhatsApp to reduce no-shows for clinics, salons, and service businesses.',
  publisher: {
    '@type': 'Organization',
    name: 'Nabda OTP',
    url: BASE_URL,
  },
};

// Page 
export default function AppointmentRemindersPage() {
  // Stats data
  const stats: [
    { value: string; labelKey: string },
    { value: string; labelKey: string },
    { value: string; labelKey: string },
    { value: string; labelKey: string },
  ] = [
    { value: '67%', labelKey: 'appointmentSolution.stats.reduction' },
    { value: '98%', labelKey: 'appointmentSolution.stats.openRate' },
    { value: '24h', labelKey: 'appointmentSolution.stats.automated' },
    { value: '$10/mo', labelKey: 'appointmentSolution.stats.unlimited' },
  ];

  // Features data
  const features = [
    {
      emoji: '📅',
      titleKey: 'appointmentSolution.features.automated.title',
      descKey: 'appointmentSolution.features.automated.desc',
    },
    {
      emoji: '⏰',
      titleKey: 'appointmentSolution.features.customTiming.title',
      descKey: 'appointmentSolution.features.customTiming.desc',
    },
    {
      emoji: '✅',
      titleKey: 'appointmentSolution.features.confirmation.title',
      descKey: 'appointmentSolution.features.confirmation.desc',
    },
    {
      emoji: '🔄',
      titleKey: 'appointmentSolution.features.rescheduling.title',
      descKey: 'appointmentSolution.features.rescheduling.desc',
    },
    {
      emoji: '📍',
      titleKey: 'appointmentSolution.features.locationSharing.title',
      descKey: 'appointmentSolution.features.locationSharing.desc',
    },
    {
      emoji: '🌐',
      titleKey: 'appointmentSolution.features.multilingual.title',
      descKey: 'appointmentSolution.features.multilingual.desc',
    },
  ];

  // Steps data
  const steps: [
    { titleKey: string; descKey: string },
    { titleKey: string; descKey: string },
    { titleKey: string; descKey: string },
    { titleKey: string; descKey: string },
  ] = [
    {
      titleKey: 'appointmentSolution.how.step1.title',
      descKey: 'appointmentSolution.how.step1.desc',
    },
    {
      titleKey: 'appointmentSolution.how.step2.title',
      descKey: 'appointmentSolution.how.step2.desc',
    },
    {
      titleKey: 'appointmentSolution.how.step3.title',
      descKey: 'appointmentSolution.how.step3.desc',
    },
    {
      titleKey: 'appointmentSolution.how.step4.title',
      descKey: 'appointmentSolution.how.step4.desc',
    },
  ];

  // Code example
  const codeExample = `// Schedule automated appointment reminder
async function scheduleAppointmentReminder(appointment) {
  // Calculate reminder time (24 hours before)
  const reminderTime = new Date(appointment.dateTime);
  reminderTime.setHours(reminderTime.getHours() - 24);

  const message = \`📅 Reminder: You have an appointment tomorrow!

📍 Location: \${appointment.clinic}
🕐 Time: \${appointment.time}
👨‍⚕️ Doctor: Dr. \${appointment.doctor}

Reply CONFIRM to confirm or RESCHEDULE to change.

– \${CLINIC_NAME}\`;

  // Schedule via Nabda OTP
  const response = await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${instanceToken}\`
    },
    body: JSON.stringify({
      phone: appointment.patientPhone,  // e.g. "+9647701234567"
      message: message
    })
  });

  if (response.ok) {
    await logReminder(appointment.id, "sent", reminderTime);
  }

  return response.ok;
}

// Trigger 24h before appointment
scheduleReminder(appointment, reminderTime);`;

  // Use cases
  const useCases = [
    { emoji: '🏥', textKey: 'appointmentSolution.usecases.item1' },
    { emoji: '🦷', textKey: 'appointmentSolution.usecases.item2' },
    { emoji: '💇', textKey: 'appointmentSolution.usecases.item3' },
    { emoji: '💅', textKey: 'appointmentSolution.usecases.item4' },
    { emoji: '🧘', textKey: 'appointmentSolution.usecases.item5' },
    { emoji: '🚗', textKey: 'appointmentSolution.usecases.item6' },
    { emoji: '🏋️', textKey: 'appointmentSolution.usecases.item7' },
    { emoji: '🐾', textKey: 'appointmentSolution.usecases.item8' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#060f1e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <SolutionHero
        icon={Clock}
        titleKey="appointmentSolution.hero.title"
        descKey="appointmentSolution.hero.desc"
        cta1Key="appointmentSolution.hero.cta1"
        cta2Key="appointmentSolution.hero.cta2"
        gradient="bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]"
      />

      {/* Stats */}
      <StatsBar stats={stats} />

      {/* Why WhatsApp Reminders */}
      <SolutionWhySection
        labelKey="appointmentSolution.why.label"
        titleKey="appointmentSolution.why.title"
        descKey="appointmentSolution.why.desc"
      >
        <FeatureGrid features={features} />
      </SolutionWhySection>

      {/* How it works */}
      <HowItWorksSteps
        labelKey="appointmentSolution.how.label"
        titleKey="appointmentSolution.how.title"
        steps={steps}
      />

      {/* Code example */}
      <CodeExample
        labelKey="appointmentSolution.code.label"
        titleKey="appointmentSolution.code.title"
        descKey="appointmentSolution.code.desc"
        code={codeExample}
        lang="appointment-reminder.js"
      />

      {/* Use cases */}
      <UseCasesList
        labelKey="appointmentSolution.usecases.label"
        titleKey="appointmentSolution.usecases.title"
        useCases={useCases}
      />

      {/* CTA */}
      <SolutionCTA
        titleKey="appointmentSolution.cta.title"
        descKey="appointmentSolution.cta.desc"
        button1Key="appointmentSolution.cta.button1"
        button2Key="appointmentSolution.cta.button2"
        button2Href="https://api.nabdaotp.com/docs"
      />
    </main>
  );
}