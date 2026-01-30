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
        <>
            {/* Page Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-white">
                        {home.trendingToday}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400">
                        {home.trendingDescription}
                    </p>
                </div>
            </div>

            {/* News Grid */}
            <NewsGrid news={news} locale={validLocale} />
        </>
    );
}
