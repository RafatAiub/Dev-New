import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/types';
import { getTranslations } from '@/lib/i18n';
import { getNewsBySlug, getAllNewsSlugs } from '@/lib/data';
import NewsDetails from '@/components/news/NewsDetails';

interface NewsPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

// Generate static params for all news slugs
export async function generateStaticParams() {
    const slugs = await getAllNewsSlugs();
    const locales = ['en', 'bn'];

    return locales.flatMap((locale) =>
        slugs.map((slug) => ({
            locale,
            slug,
        }))
    );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NewsPageProps) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) {
        return {
            title: 'News Not Found',
        };
    }

    return {
        title: news.title,
        description: news.description.slice(0, 160),
        openGraph: {
            title: news.title,
            description: news.description.slice(0, 160),
            type: 'article',
            publishedTime: news.published_date,
            authors: [news.author_name],
        },
    };
}

export default async function NewsPage({ params }: NewsPageProps) {
    const { locale, slug } = await params;
    const validLocale = (locale === 'bn' ? 'bn' : 'en') as Locale;
    const [translations, news] = await Promise.all([
        getTranslations(validLocale),
        getNewsBySlug(slug),
    ]);

    if (!news) {
        notFound();
    }

    return (
        <>
            {/* Back Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <Link
                    href={`/${validLocale}`}
                    className="btn"
                >
                    ← {translations.news.backToHome}
                </Link>
            </div>

            {/* News Content */}
            <NewsDetails news={news} translations={translations} />
        </>
    );
}
