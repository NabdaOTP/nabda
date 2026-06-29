'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from '../ui/button';


const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'tr', label: 'Türkçe' },
] as const;

const NAV_LINKS = [
  { key: 'features',  href: '/#features' },
  { key: 'pricing',   href: '/#pricing' },
  { key: 'solutions', href: '/solutions' },
  { key: 'comparing', href: '/comparing' },
  { key: 'blogs',     href: '/blogs' },
] as const;

export default function Header() {
  const t        = useTranslations('nav');
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const PAGES_WITHOUT_SECTIONS = ['/solutions', '/comparing', '/blogs', '/about', '/privacy-policy', '/terms-of-service', '/refund-policy'];
  const useHomeAnchor = PAGES_WITHOUT_SECTIONS.some(p => pathname === p || pathname.startsWith(p + '/'));
  const anchorBase = (useHomeAnchor || pathname === '/') ? '' : pathname;

  const NAV_LINKS = [
    { key: 'features',  href: `${anchorBase}/#features` },
    { key: 'pricing',   href: `${anchorBase}/#pricing` },
    { key: 'solutions', href: '/solutions' },
    { key: 'comparing', href: '/comparing' },
    { key: 'blogs',     href: '/blogs', newTab: true },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen,   setLangOpen]   = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code });
    setLangOpen(false);
    setMobileOpen(false);
  };

  const currentLang = LANGUAGES.find((l) => l.code === locale)?.label ?? 'English';

  return (
    <>
      {/* Fixed Header Bar */}
      <header className="
        fixed top-0 inset-x-0 z-50 transition-colors duration-300
        bg-white/80 dark:bg-[#0a1628]/80
        backdrop-blur-xl
        border-b border-black/8 dark:border-white/8
        shadow-sm
      ">
        <nav className="max-w-300 mx-auto px-6 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            aria-label="Nabda OTP"
            className="flex items-center gap-2.5 font-bold text-lg text-deep-navy dark:text-white shrink-0 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/assets/android-chrome-192x192.png"
              alt=""
              width={40}
              height={40}
              className="rounded-xl"
              priority
            />
            <span className="hidden sm:inline tracking-tight" aria-hidden="true">Nabda OTP</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {NAV_LINKS.map(({ key, href, newTab }) => (
              <li key={key}>
                <Link
                  href={href}
                  {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="text-[0.9375rem] font-medium text-navy-lighter hover:text-[#635bff] dark:text-[#8899a6] dark:hover:text-white transition-colors duration-150"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://api.nabdaotp.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.9375rem] font-medium text-navy-lighter hover:text-[#635bff] dark:text-[#8899a6] dark:hover:text-white transition-colors duration-150"
              >
                {t('docs')}
              </a>
            </li>
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <Button
                variant="ghost"
                onClick={() => setLangOpen((p) => !p)}
                aria-expanded={langOpen}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full transition-colors
                  text-navy-lighter hover:bg-gray-100
                  dark:text-[#8899a6] dark:hover:bg-white/10"
              >
                <Globe size={15} strokeWidth={2} />
                <span>{currentLang}</span>
                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                />
              </Button>

              {langOpen && (
                <ul className="
                  absolute inset-e-0 top-[calc(100%+6px)] min-w-40
                  border rounded-xl shadow-lg overflow-hidden z-50 py-1
                  bg-white border-gray-100
                  dark:bg-[#0f1e30] dark:border-white/10
                ">
                  {LANGUAGES.map(({ code, label }) => (
                    <li key={code}>
                      <button
                        onClick={() => switchLocale(code)}
                        className={`w-full text-start px-4 py-2.5 text-sm transition-colors
                          hover:bg-[#635bff]/5 dark:hover:bg-white/5
                          ${locale === code
                            ? 'font-semibold text-[#635bff] dark:text-[#a89fff]'
                            : 'text-deep-navy dark:text-[#8899a6]'
                          }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Login CTA */}
            <a
              href="https://dash.nabdaotp.com/en/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-[#635bff] hover:bg-[#7a73ff] text-white text-sm font-semibold rounded-full shadow-[0_4px_14px_rgba(99,91,255,0.35)] hover:shadow-[0_6px_20px_rgba(99,91,255,0.5)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('login')}
            </a>
          </div>

          {/* Mobile: Theme + Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="p-2 rounded-lg transition-colors text-deep-navy hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Panel */}
      <div className={`
        fixed top-0 inset-x-0 z-50 shadow-2xl lg:hidden
        bg-white dark:bg-[#0a1628]
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-y-0' : '-translate-y-full'}
      `}>
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100 dark:border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-lg text-deep-navy dark:text-white"
            onClick={() => setMobileOpen(false)}
          >
            <Image src="/assets/android-chrome-192x192.png" alt="Nabda OTP" width={36} height={36} className="rounded-xl" />
            <span>Nabda OTP</span>
          </Link>
          <Button
            variant="ghost"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-lg text-deep-navy hover:bg-gray-100 dark:text-white dark:hover:bg-white/10 transition-colors"
          >
            <X size={22} />
          </Button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col px-4 py-2 border-b border-gray-100 dark:border-white/10">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-3.5 text-[0.9375rem] font-medium rounded-xl transition-colors text-deep-navy hover:text-[#635bff] hover:bg-[#635bff]/5 dark:text-[#8899a6] dark:hover:text-white dark:hover:bg-white/5"
              >
                {t(key)}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://api.nabdaotp.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-3 py-3.5 text-[0.9375rem] font-medium rounded-xl transition-colors text-deep-navy hover:text-[#635bff] hover:bg-[#635bff]/5 dark:text-[#8899a6] dark:hover:text-white dark:hover:bg-white/5"
            >
              {t('docs')}
            </a>
          </li>
        </ul>

        {/* Language */}
        <div className="px-4 py-4 border-b border-gray-100 dark:border-white/10">
          <p className="px-1 mb-3 text-xs font-semibold text-gray-400 dark:text-[#4a6278] uppercase tracking-widest">Language</p>
          <div className="flex gap-2">
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => switchLocale(code)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                  locale === code
                    ? 'bg-[#635bff] text-white shadow-[0_4px_12px_rgba(99,91,255,0.35)]'
                    : 'bg-gray-100 text-deep-navy hover:bg-gray-200 dark:bg-white/8 dark:text-[#8899a6] dark:hover:bg-white/15'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Login */}
        <div className="px-4 py-4">
          <a
            href="https://dash.nabdaotp.com/en/login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3.5 bg-[#635bff] hover:bg-[#7a73ff] text-white text-base font-semibold rounded-full shadow-[0_4px_14px_rgba(99,91,255,0.4)] transition-all"
          >
            {t('login')}
          </a>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}