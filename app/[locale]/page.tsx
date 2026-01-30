import type { Locale } from '@/types';
import { getTranslations } from '@/lib/i18n';
import { getNewsData } from '@/lib/data';
import NewsGrid from '@/components/news/NewsGrid';

interface HomePageProps {
    params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
    const { locale } = await params;
    const validLocale = (locale === 'bn' ? 'bn' : 'en') as Locale;
    const [translations, news] = await Promise.all([
        getTranslations(validLocale),
        getNewsData(),
    ]);

    const { home } = translations;

    return (
        <div className="w-full">
            {/* Section Header */}
            <div className="mb-5">
                <h2 className="text-base font-bold text-white">
                    {home.trendingToday}
                </h2>
                <p className="mt-0.5 text-xs text-zinc-500">
                    {home.trendingDescription}
                </p>
            </div>

            {/* News Grid */}
            <NewsGrid news={news} locale={validLocale} />
        </div>
    );
}
