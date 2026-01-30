import type { NewsItem, Locale } from '@/types';
import NewsCard from '@/components/ui/NewsCard';

interface NewsGridProps {
    news: NewsItem[];
    locale: Locale;
}

export default function NewsGrid({ news, locale }: NewsGridProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {news.map((item, index) => (
                <NewsCard key={item.id} news={item} locale={locale} index={index} />
            ))}
        </div>
    );
}
