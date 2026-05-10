import SolutionHero from '@/components/solutions/SolutionHero';
import StatsBar from '@/components/solutions/StatsBar';
import FeatureGrid from '@/components/solutions/FeatureGrid';
import SolutionWhySection from '@/components/solutions/SolutionWhySection';
import HowItWorksSteps from '@/components/solutions/HowItWorksSteps';
import CodeExample from '@/components/solutions/CodeExample';
import UseCasesList from '@/components/solutions/UseCasesList';
import SolutionCTA from '@/components/solutions/SolutionCTA';
import { ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// ── Metadata ──────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAR = locale === 'ar';
  const isTR = locale === 'tr';

  const titles = {
    en: 'Account Security & Login Alerts via WhatsApp — Real-time Fraud Detection | Nabda OTP',
    ar: 'أمان الحسابات وتنبيهات تسجيل الدخول عبر واتساب — كشف الاحتيال الفوري | نبضة OTP',
    tr: 'WhatsApp ile Hesap Güvenliği ve Giriş Uyarıları — Gerçek Zamanlı Dolandırıcılık Tespiti | Nabda OTP',
  };

  const descriptions = {
    en: 'Protect user accounts with instant WhatsApp security alerts. Notify users of suspicious logins, password changes, and unauthorized access attempts in real-time. 99.9% delivery rate, <2s alert time. Built for Iraq, Syria & MENA with Nabda OTP.',
    ar: 'احمِ حسابات المستخدمين بتنبيهات أمان واتساب الفورية. أعلم المستخدمين بعمليات تسجيل الدخول المشبوهة، تغييرات كلمة المرور، ومحاولات الوصول غير المصرح بها في الوقت الفعلي. نسبة تسليم 99.9%، وقت تنبيه أقل من ثانيتين. مع نبضة OTP.',
    tr: 'Kullanıcı hesaplarını anında WhatsApp güvenlik uyarılarıyla koruyun. Kullanıcıları şüpheli girişler, şifre değişiklikleri ve yetkisiz erişim girişimleri hakkında gerçek zamanlı bilgilendirin. %99.9 teslimat oranı, <2s uyarı süresi. Nabda OTP ile.',
  };

  const title = titles[locale as keyof typeof titles] ?? titles.en;
  const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

  const canonicalPath =
    locale === 'en'
      ? `${BASE_URL}/solutions/account-security`
      : `${BASE_URL}/${locale}/solutions/account-security`;

  return {
    title,
    description: desc,
    keywords: 'WhatsApp security alerts, account protection WhatsApp, login notifications Iraq, fraud detection WhatsApp, Nabda OTP security, 2FA WhatsApp MENA, suspicious login alerts',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${BASE_URL}/solutions/account-security`,
        ar: `${BASE_URL}/ar/solutions/account-security`,
        tr: `${BASE_URL}/tr/solutions/account-security`,
        'x-default': `${BASE_URL}/solutions/account-security`,
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
          url: `${BASE_URL}/assets/og-account-security.png`,
          width: 1200,
          height: 630,
          alt: 'Account Security & Login Alerts via WhatsApp — Nabda OTP',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [`${BASE_URL}/assets/og-account-security.png`],
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

// ── JSON-LD ───────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Account Security & Login Alerts via WhatsApp',
  description:
    'Protect user accounts with instant WhatsApp security alerts for suspicious logins and unauthorized access.',
  publisher: {
    '@type': 'Organization',
    name: 'Nabda OTP',
    url: BASE_URL,
  },
};

// ── Page ──────────────────────────────────────────────────
export default function AccountSecurityPage() {
  // Stats data
  const stats: [
    { value: string; labelKey: string },
    { value: string; labelKey: string },
    { value: string; labelKey: string },
    { value: string; labelKey: string },
  ] = [
    { value: '<2s', labelKey: 'securitySolution.stats.alertTime' },
    { value: '99.9%', labelKey: 'securitySolution.stats.deliveryRate' },
    { value: '85%', labelKey: 'securitySolution.stats.fraudDetection' },
    { value: '$10/mo', labelKey: 'securitySolution.stats.unlimited' },
  ];

  // Features data
  const features = [
    {
      emoji: '🔐',
      titleKey: 'securitySolution.features.loginAlerts.title',
      descKey: 'securitySolution.features.loginAlerts.desc',
    },
    {
      emoji: '🌍',
      titleKey: 'securitySolution.features.geoLocation.title',
      descKey: 'securitySolution.features.geoLocation.desc',
    },
    {
      emoji: '🚨',
      titleKey: 'securitySolution.features.suspicious.title',
      descKey: 'securitySolution.features.suspicious.desc',
    },
    {
      emoji: '🔑',
      titleKey: 'securitySolution.features.passwordChange.title',
      descKey: 'securitySolution.features.passwordChange.desc',
    },
    {
      emoji: '📱',
      titleKey: 'securitySolution.features.deviceVerification.title',
      descKey: 'securitySolution.features.deviceVerification.desc',
    },
    {
      emoji: '🛡️',
      titleKey: 'securitySolution.features.threatResponse.title',
      descKey: 'securitySolution.features.threatResponse.desc',
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
      titleKey: 'securitySolution.how.step1.title',
      descKey: 'securitySolution.how.step1.desc',
    },
    {
      titleKey: 'securitySolution.how.step2.title',
      descKey: 'securitySolution.how.step2.desc',
    },
    {
      titleKey: 'securitySolution.how.step3.title',
      descKey: 'securitySolution.how.step3.desc',
    },
    {
      titleKey: 'securitySolution.how.step4.title',
      descKey: 'securitySolution.how.step4.desc',
    },
  ];

  // Code example
  const codeExample = `// Trigger security alert on suspicious login
async function sendSecurityAlert(user, event) {
  const message = \`🔐 New login to your account from \${event.device} in \${event.city}.
  
If this wasn't you, reply BLOCK immediately.
Time: \${event.timestamp}
IP: \${event.ip}

– YourApp Security Team\`;

  const response = await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${instanceToken}\`
    },
    body: JSON.stringify({
      phone: user.phone,  // e.g. "+9647701234567"
      message: message
    })
  });

  if (response.ok) {
    await logSecurityEvent(user.id, "login_alert_sent", event);
  }

  return response.ok;
}

// Hook into your auth system
app.post("/auth/login", async (req, res) => {
  const user = await authenticateUser(req.body);
  
  // Send instant WhatsApp alert
  await sendSecurityAlert(user, {
    device: req.headers["user-agent"],
    city: req.geo.city,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  
  res.json({ success: true });
});`;

  // Use cases
  const useCases = [
    { emoji: '🏦', textKey: 'securitySolution.usecases.item1' },
    { emoji: '💳', textKey: 'securitySolution.usecases.item2' },
    { emoji: '🏢', textKey: 'securitySolution.usecases.item3' },
    { emoji: '🎓', textKey: 'securitySolution.usecases.item4' },
    { emoji: '🏥', textKey: 'securitySolution.usecases.item5' },
    { emoji: '🛒', textKey: 'securitySolution.usecases.item6' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#060f1e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <SolutionHero
        icon={ShieldCheck}
        titleKey="securitySolution.hero.title"
        descKey="securitySolution.hero.desc"
        cta1Key="securitySolution.hero.cta1"
        cta2Key="securitySolution.hero.cta2"
        gradient="from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]"
      />

      {/* Stats */}
      <StatsBar stats={stats} />

      {/* Why WhatsApp Security */}
      <SolutionWhySection
        labelKey="securitySolution.why.label"
        titleKey="securitySolution.why.title"
        descKey="securitySolution.why.desc"
      >
        <FeatureGrid features={features} />
      </SolutionWhySection>

      {/* How it works */}
      <HowItWorksSteps
        labelKey="securitySolution.how.label"
        titleKey="securitySolution.how.title"
        steps={steps}
      />

      {/* Code example */}
      <CodeExample
        labelKey="securitySolution.code.label"
        titleKey="securitySolution.code.title"
        descKey="securitySolution.code.desc"
        code={codeExample}
        lang="security-alert.js"
      />

      {/* Use cases */}
      <UseCasesList
        labelKey="securitySolution.usecases.label"
        titleKey="securitySolution.usecases.title"
        useCases={useCases}
      />

      {/* CTA */}
      <SolutionCTA
        titleKey="securitySolution.cta.title"
        descKey="securitySolution.cta.desc"
        button1Key="securitySolution.cta.button1"
        button2Key="securitySolution.cta.button2"
        button2Href="https://api.nabdaotp.com/docs"
      />
    </main>
  );
}