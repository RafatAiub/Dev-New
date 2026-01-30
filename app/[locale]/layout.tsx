import { ReactNode } from 'react';
import type { Locale } from '@/types';
import { getTranslations } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
        <div className="relative overflow-hidden">
            {/* Background Effects */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute -left-32 top-10 h-80 w-80 rounded-full glow-effect"
                />
                <div
                    className="absolute right-0 top-52 h-72 w-72 rounded-full glow-effect-subtle"
                />
                <div className="noise absolute inset-0" />
            </div>

            {/* Main Content */}
            <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <Header locale={validLocale} translations={translations} />
                <main className="mt-12">
                    {children}
                </main>
                <Footer translations={translations} />
            </div>

            {/* Modal Slot (Parallel Route) */}
            {modal}
        </div>
    );
}
