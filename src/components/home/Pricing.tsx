'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Feature lists 
const STANDARD_FEATURES = [
  'unlimited', 'noFee', 'trial', 'api',
  'webhookReceive', 'media', 'webhook', 'support', 'cancel', 'nonOfficial',
] as const;

const ENTERPRISE_FEATURES = [
  'meta', 'officialApiFromMeta', 'freeSetupAccount', 'technicalSupportWhatsapp', 'noMetaRestrictions',
  'greenBadge', 'limits', 'verification', 'onboarding', 'support', 'sla',
] as const;

// Reusable check item
function FeatureItem({
  label,
  dark = false,
  included = true,
}: {
  label: string;
  dark?: boolean;
  included?: boolean;
}) {
  return (
    <li className="flex items-center gap-3 py-1.5">
      <span className={cn(
        'flex items-center justify-center w-5 h-5 rounded-full shrink-0',
        included ? 'bg-[#00d4aa]/15' : 'bg-red-500/15'
      )}>
        {included ? (
          <Check size={12} strokeWidth={3} className="text-[#00d4aa]" />
        ) : (
          <X size={12} strokeWidth={3} className="text-red-400" />
        )}
      </span>
      <span className={cn(
        'text-[0.9375rem]',
        dark
          ? included ? 'text-white/80' : 'text-white/50'
          : included ? 'text-[#0a2540] dark:text-[#cbd5e1]' : 'text-[#0a2540]/50 dark:text-[#cbd5e1]/50'
      )}>
        {label}
      </span>
    </li>
  );
}

// Main 
export default function Pricing() {
  const t = useTranslations('pricing');
  const tf = useTranslations('pricing.features');
  const te = useTranslations('pricing.enterprise');
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const isAnnual = billing === 'annual';

  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-14 md:py-18 bg-[#0a2540] dark:bg-[#04080f]"
    >
      {/*  Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/2 -right-1/4 w-150 h-150 rounded-full bg-[#635bff]/15 blur-[120px]" />
        <div className="absolute -bottom-1/3 -left-1/4 w-100 h-100 rounded-full bg-[#635bff]/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 rounded-full bg-[#00d4aa]/5 blur-[80px]" />
      </div>

      <div className="relative max-w-300 mx-auto px-6">

        {/*  Header  */}
        <div className="text-center max-w-160 mx-auto mb-8">
          <h2 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4 text-white">
            {t('title')}
          </h2>
          <p className="text-lg leading-relaxed text-white/70">
            {t('subtitle')}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-sm">
            {(['monthly', 'annual'] as const).map((plan) => (
              <button
                key={plan}
                onClick={() => setBilling(plan)}
                className={cn(
                  'px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-200',
                  billing === plan
                    ? 'bg-[#635bff] text-white'
                    : 'text-white/60 hover:text-white'
                )}
              >
                {plan === 'monthly' ? t('monthly') : t('annualTitle')}
                {plan === 'annual' && (
                  <span className="ms-2 px-2 py-0.5 rounded-full bg-[#00d4aa]/20 text-[#00d4aa] text-[0.7rem] font-bold">
                    -8%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">

          {/* 1. Standard Card */}
          <Card className="relative overflow-visible bg-[#0d1525]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="px-4 py-1 text-xs font-bold uppercase tracking-wider bg-linear-to-r from-[#635bff] to-[#4b44cc] text-white border-0 whitespace-nowrap">
                {t('standard.badge')}
              </Badge>
            </div>

            <div key={billing} className="animate-billing-swap">
              <CardHeader className="text-center pt-9 pb-5">
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span className="text-2xl font-semibold text-white/50">$</span>
                  <span className="text-6xl font-extrabold tracking-tight text-white">
                    {isAnnual ? '110' : '10'}
                  </span>
                  <span className="text-base font-medium text-white/50">
                    {isAnnual ? t('periodYear') : t('period')}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-sm text-white/60">
                  {isAnnual && (
                    <p className="font-semibold text-[#a89fff]">
                      {t('annual.save')}
                    </p>
                  )}
                  <p>{t('standard.typeLine')}</p>
                  <p>{isAnnual ? t('annual.bestFor') : t('standard.bestForLine')}</p>
                  <p>{t('standard.messagesLine')}</p>
                </div>
              </CardHeader>

              <Separator className="bg-white/10" />

              <CardContent className="pt-5 pb-7">
                <ul className="space-y-0.5 mb-8">
                  {STANDARD_FEATURES.map((key) => (
                    <FeatureItem
                      key={key}
                      label={tf(key)}
                      dark
                      included={key !== 'nonOfficial'}
                    />
                  ))}
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="w-full py-6 text-white text-[16px] font-semibold rounded-full bg-white/8 hover:bg-white/15 [a]:hover:bg-white/15 transition-colors duration-200"
                >
                  <a href="https://dash.nabdaotp.com/" target="_blank" rel="noopener noreferrer">
                    {isAnnual ? t('cta.yearly') : t('cta.trial')}
                  </a>
                </Button>
                <p className="text-center text-sm text-white/40 mt-4">
                  {isAnnual ? t('note.yearly') : t('note.trial')}
                </p>
              </CardContent>
            </div>
          </Card>

          {/* 2. Enterprise Card — highlighted */}
          <Card className="
            relative overflow-visible
            bg-linear-to-b from-[#0f1e40] to-[#0a1628]
            z-10
            dark:from-[#0d1230] dark:to-[#080e20]
          ">
            {/* Glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[#635bff]/5" />

            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="px-4 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#00d4aa] to-[#00a88a] text-[#0a2540] border-0 whitespace-nowrap">
                {te('enter')}
              </Badge>
            </div>

            <CardHeader className="text-center pt-9 pb-5">
              <div className="flex items-baseline justify-center mb-3">
                <span className="text-4xl font-extrabold text-white">{te('contact')}</span>
              </div>
              <div className="flex flex-col gap-1 text-sm text-white/60">
                <p>{te('type')}</p>
                <p>{te('bestFor')}</p>
                <p>{te('messages')}</p>
              </div>
            </CardHeader>

            <Separator className="bg-white/10" />

            <CardContent className="pt-5 pb-7">
              <ul className="space-y-0.5 mb-8">
                {ENTERPRISE_FEATURES.map((key) => (
                  <FeatureItem
                    key={key}
                    label={
                      key === 'support'
                        ? tf('support')
                        : te(key as 'meta' | 'officialApiFromMeta' | 'freeSetupAccount' | 'technicalSupportWhatsapp' | 'noMetaRestrictions' | 'greenBadge' | 'limits' | 'verification' | 'onboarding' | 'sla')
                    }
                    dark
                  />
                ))}
              </ul>
              <Button
                asChild
                className="w-full py-6 text-base font-bold rounded-full text-white bg-[#635bff] hover:bg-[#7a73ff] [a]:hover:bg-[#7a73ff] transition-colors"
              >
                <a href="https://wevlix.com/en" target="_blank" rel="noopener noreferrer">
                  {t('cta.contact')}
                </a>
              </Button>
              <p className="text-center text-sm text-white/40 mt-4">
                {t('note.enterprise')}
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}