'use client';

import dynamic from 'next/dynamic';

const GeoLocationBanner = dynamic(
  () => import('@/components/home/GeoLocationBanner'),
  { ssr: false }
);

export default function GeoLocationBannerLoader() {
  return <GeoLocationBanner />;
}
