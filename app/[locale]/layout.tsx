import { ReactNode } from 'react';
import type { Locale } from '@/types';
import { getTranslations } from '@/lib/i18n';
import Header from '@/components/layout/Header';

interface LocaleLayoutProps {
    children: ReactNode;
    modal: ReactNode;
    params: Promise<{ locale: string }>;
}

// Generate static params for locales
export async function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'bn' }];
}

// Generate metadata based on locale
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const validLocale = (locale === 'bn' ? 'bn' : 'en') as Locale;
    const translations = await getTranslations(validLocale);

    return {
        title: translations.nav.title,
        description: translations.nav.tagline,
    };
}

export default async function LocaleLayout({
    children,
    modal,
    params,
}: LocaleLayoutProps) {
    const { locale } = await params;
    const validLocale = (locale === 'bn' ? 'bn' : 'en') as Locale;
    const translations = await getTranslations(validLocale);

    return (
        <div className="min-h-screen w-full bg-[#0b0d12]">
            {/* Background Effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />
            </div>

            {/* Main Content Container */}
            <div className="relative w-full">
                {/* Header Section - py-4 for vertical spacing, px for horizontal */}
                <header className="w-full px-6 py-4 sm:px-8 lg:px-12">
                    <Header locale={validLocale} translations={translations} />
                </header>

                {/* Main Content Section - consistent horizontal padding, proper top margin */}
                <main className="w-full px-6 pt-4 pb-8 sm:px-8 lg:px-12">
                    {children}
                </main>
            </div>

            {/* Modal Slot (Parallel Route) */}
            {modal}
        </div>
    );
}
