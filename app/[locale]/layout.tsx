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
        <div className="min-h-screen bg-[#0b0d12]">
            {/* Background Effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />
            </div>

            {/* Main Content */}
            <div className="relative mx-auto max-w-6xl px-4 py-6">
                <Header locale={validLocale} translations={translations} />
                <main className="mt-8">
                    {children}
                </main>
            </div>

            {/* Modal Slot (Parallel Route) */}
            {modal}
        </div>
    );
}
