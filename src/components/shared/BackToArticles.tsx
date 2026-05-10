import { Link } from '@/i18n/navigation'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl';
import React from 'react'

export default function BackToArticles() {
    const t = useTranslations('blogs.blogPost');
    return (
        <>
            {/* Back link */}
            <div className="mt-8 text-center">
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#635bff] text-[#635bff] hover:bg-[#635bff] hover:text-white text-sm font-medium transition-all duration-200"
                >
                    <ArrowLeft size={15} />
                    {t('back')}
                </Link>
            </div>
        </>
    )
}
