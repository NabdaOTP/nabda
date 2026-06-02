import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

// Helper 
function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string; external?: boolean; accent?: boolean }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-5 tracking-wide">{title}</h4>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href, external, accent }) => {
          const cls = `text-[0.875rem] leading-snug transition-colors duration-150 ${
            accent
              ? 'text-[#635bff] hover:text-[#7a73ff] font-medium'
              : 'text-[#94a3b8] hover:text-white'
          }`;
          return (
            <li key={href}>
              {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {label}
                </a>
              ) : (
                <Link href={href} className={cls}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Main Component
export default function Footer() {
  const t = useTranslations('footer');

  const PRODUCT_LINKS = [
    { label: t('links.product.features'),  href: '/#features' },
    { label: t('links.product.pricing'),   href: '/#pricing' },
    { label: t('links.product.solutions'), href: '/solutions' },
    { label: t('links.product.comparisons'), href: '/comparing' },
    { label: t('links.product.docs'),      href: 'https://api.nabdaotp.com/docs', external: true },
  ];

  const SOLUTIONS_LINKS = [
    { label: t('links.solutions.otp'),          href: '/solutions/otp-verification' },
    { label: t('links.solutions.orders'),        href: '/solutions/order-confirmations' },
    { label: t('links.solutions.security'),      href: '/solutions/account-security' },
    { label: t('links.solutions.appointments'),  href: '/solutions/appointment-reminders' },
    { label: t('links.solutions.support'),       href: '/solutions/customer-support' },
    { label: t('links.solutions.marketing'),     href: '/solutions/marketing' },
  ];

  const COMPARISONS_LINKS = [
    { label: t('links.comparisons.ultramsg'),     href: '/comparing/nabda-vs-ultramsg' },
    { label: t('links.comparisons.twilio'),       href: '/comparing/nabda-vs-twilio' },
    { label: t('links.comparisons.official'),     href: '/comparing/nabda-vs-official' },
    { label: t('links.comparisons.bulksms'),      href: '/comparing/nabda-vs-bulk-sms' },
    { label: t('links.comparisons.otpiq'),        href: '/comparing/nabda-vs-otpiq' },
    { label: t('links.comparisons.alternatives'), href: '/comparing/nabda-vs-alternatives', accent: true },
  ];

  const RESOURCES_LINKS = [
    { label: t('links.resources.blog'),       href: '/blogs' },
    { label: t('links.resources.iraq_guide'), href: '/blogs/whatsapp-otp-iraq-guide' },
    { label: t('links.resources.vs_sms'),     href: '/blogs/whatsapp-replacing-sms' },
    { label: t('links.resources.bundle_vs_instance'), href: '/blogs/bundle-vs-instance'},
    { label: t('links.resources.top_5mis'), href: '/blogs/whatsapp-otp-mistakes'},
    { label: t('links.resources.whats_vs_sms'), href: '/blogs/whatsapp-replacing-sms'},
    { label: t('links.resources.api_ref'),    href: 'https://api.nabdaotp.com/docs', external: true },
  ];

  const COMPANY_LINKS = [
    { label: t('links.company.about'),   href: '/about' },
    { label: t('links.company.contact'), href: 'https://wa.me/905346639145', external: true },
    { label: t('links.company.privacy'), href: '/privacy-policy' },
    { label: t('links.company.terms'),   href: '/terms-of-service' },
    { label: t('links.company.refund'),  href: '/refund-policy' },
  ];

  const COUNTRIES = [
    { flag: '🇮🇶', name: t('countries.iraq'),      href: '/iraq' },
    { flag: '🇪🇬', name: t('countries.egypt'),     href: '/egypt' },
    { flag: '🇸🇦', name: t('countries.saudi'),     href: '/saudi-arabia' },
    { flag: '🇦🇪', name: t('countries.uae'),       href: '/united-arab-emirates' },
    { flag: '🇶🇦', name: t('countries.qatar'),     href: '/qatar' },
    { flag: '🇯🇴', name: t('countries.jordan'),    href: '/jordan' },
    { flag: '🇸🇾', name: t('countries.syria'),     href: '/syria' },
    { flag: '🇹🇷', name: t('countries.turkey'),    href: '/turkey' },
    { flag: '🇩🇿', name: t('countries.algeria'),   href: '/algeria' },
    { flag: '🇲🇦', name: t('countries.morocco'),   href: '/morocco' },
    { flag: '🇰🇼', name: t('countries.kuwait'),    href: '/kuwait' },
    { flag: '🇧🇭', name: t('countries.bahrain'),   href: '/bahrain' },
    { flag: '🇴🇲', name: t('countries.oman'),      href: '/oman' },
    { flag: '🇱🇧', name: t('countries.lebanon'),   href: '/lebanon' },
    { flag: '🇹🇳', name: t('countries.tunisia'),   href: '/tunisia' },
    { flag: '🇱🇾', name: t('countries.libya'),     href: '/libya' },
    { flag: '🇵🇸', name: t('countries.palestine'), href: '/palestine' },
    { flag: '🇸🇩', name: t('countries.sudan'),     href: '/sudan' },
    { flag: '🇾🇪', name: t('countries.yemen'),     href: '/yemen' },
    { flag: '🇺🇸', name: t('countries.usa'),         href: '/usa' },
    { flag: '🇩🇪', name: t('countries.germany'),     href: '/germany' },
    { flag: '🇫🇷', name: t('countries.france'),      href: '/france' },
    { flag: '🇳🇱', name: t('countries.netherlands'), href: '/netherlands' },
    { flag: '🇪🇸', name: t('countries.spain'),       href: '/spain' },
    { flag: '🇮🇹', name: t('countries.italy'),       href: '/italy' },
    { flag: '🇵🇱', name: t('countries.poland'),      href: '/poland' },
    { flag: '🇸🇪', name: t('countries.sweden'),      href: '/sweden' },
    { flag: '🇧🇪', name: t('countries.belgium'),     href: '/belgium' },
    { flag: '🇬🇧', name: t('countries.uk'),          href: '/united-kingdom' },
    { flag: '🇨🇦', name: t('countries.canada'),      href: '/canada' },
    { flag: '🇮🇳', name: t('countries.india'),       href: '/india' },
    { flag: '🇵🇰', name: t('countries.pakistan'),    href: '/pakistan' },
    { flag: '🇮🇩', name: t('countries.indonesia'),   href: '/indonesia' },
    { flag: '🇲🇾', name: t('countries.malaysia'),    href: '/malaysia' },
    { flag: '🇧🇩', name: t('countries.bangladesh'),  href: '/bangladesh' },
  ];

  return (
    <footer className="bg-[#0a0f1e] text-[#94a3b8]">

      {/*Countries Strip*/}
      <div className="border-b border-white/8">
        <div className="max-w-300 mx-auto px-6 py-5">
          <p className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-4">
            {t('regions')}
          </p>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map(({ flag, name, href }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[0.8125rem] text-[#94a3b8] hover:text-white transition-all duration-150 border border-white/8 hover:border-white/20"
              >
                <span>{flag}</span>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Link Grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-14">

        {/* Top: Logo + tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 pb-10 border-b border-white/8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-bold text-xl text-white hover:opacity-80 transition-opacity"
          >
            <Image
              src="/assets/android-chrome-192x192.png"
              alt="Nabda OTP"
              width={44}
              height={44}
              className="rounded-xl"
              loading="lazy"
            />
            <span>Nabda OTP</span>
          </Link>
          <p className="text-sm text-[#475569] max-w-xs leading-relaxed">
            {t('desc')}
          </p>
        </div>

        {/* 5-column links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
          <FooterCol title={t('product')}     links={PRODUCT_LINKS} />
          <FooterCol title={t('solutions')}   links={SOLUTIONS_LINKS} />
          <FooterCol title={t('comparisons')} links={COMPARISONS_LINKS} />
          <FooterCol title={t('resources')}   links={RESOURCES_LINKS} />
          <FooterCol title={t('company')}     links={COMPANY_LINKS} />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-300 mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Badges */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-[#475569]">
              <span className="w-2 h-2 rounded-full bg-[#00d4aa] inline-block animate-pulse" />
              <span>{t('badges.uptime')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#475569]">
              <span className="text-base">🔒</span>
              <span>{t('badges.encryption')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#475569]">
              <span className="text-base">⚡</span>
              <span>{t('badges.api')}</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#334155] text-center">
            {t('copyright')}
          </p>
        </div>

        {/* SEO text — visually subtle but crawlable */}
        <div className="max-w-300 mx-auto px-6 pb-4">
          <p className="text-[0.6875rem] text-[#2c3b53] leading-relaxed text-center">
            {t('seo')}
          </p>
        </div>
      </div>
    </footer>
  );
}