import type { NewsItem, Locale } from '@/types';
import NewsCard from '@/components/ui/NewsCard';

interface NewsGridProps {
    news: NewsItem[];
    locale: Locale;
}

export default function NewsGrid({ news, locale }: NewsGridProps) {
    return (
        <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item, index) => (
                <NewsCard key={item.id} news={item} locale={locale} index={index} />
            ))}
        </section>
    );
}
