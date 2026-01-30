import Link from 'next/link';
import Image from 'next/image';
import type { NewsItem, Locale } from '@/types';
import { formatCount, formatRelativeDate, getImagePath } from '@/lib/utils';

interface NewsCardProps {
    news: NewsItem;
    locale: Locale;
    index?: number;
}

export default function NewsCard({ news, locale, index = 0 }: NewsCardProps) {
    const animationDelay = index * 80;

    return (
        <div
            className="reveal"
            style={{ animationDelay: `${animationDelay}ms` }}
        >
            <Link
                href={`/${locale}/news/${news.slug}`}
                className="group block h-full rounded-2xl bg-[#10131a] border border-white/[0.08] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
            >
                {/* Thumbnail */}
                <div className="aspect-video overflow-hidden rounded-xl bg-zinc-800">
                    <img
                        src={getImagePath(news.thumbnail)}
                        alt={news.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Author & Date */}
                <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <img
                            src={getImagePath(news.author_avatar)}
                            alt={news.author_name}
                            className="h-6 w-6 rounded-full object-cover ring-1 ring-white/10"
                        />
                        <span className="text-zinc-400">{news.author_name}</span>
                    </div>
                    <span className="text-zinc-500">{formatRelativeDate(news.published_date)}</span>
                </div>

                {/* Title */}
                <h3 className="mt-2.5 text-[15px] font-semibold leading-snug text-white line-clamp-2 group-hover:text-cyan-100 transition-colors">
                    {news.title}
                </h3>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {news.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-cyan-500/10 border border-cyan-400/20 px-2 py-0.5 text-[10px] font-medium text-cyan-300"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                    <div className="flex items-center gap-2.5">
                        {/* Upvotes */}
                        <span className="flex items-center gap-1 text-emerald-400/80">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                                <path d="M12 4L5 11H9V20H15V11H19L12 4Z" />
                            </svg>
                            <span className="text-zinc-400">{formatCount(news.upvotes)}</span>
                        </span>
                        {/* Downvotes */}
                        <span className="flex items-center gap-1 text-rose-400/80">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                                <path d="M12 20L19 13H15V4H9V13H5L12 20Z" />
                            </svg>
                            <span className="text-zinc-400">{formatCount(news.downvotes)}</span>
                        </span>
                    </div>
                    {/* Views */}
                    <span className="flex items-center gap-1">
                        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-zinc-600">
                            <path
                                d="M2 12C4.5 7 7.5 5 12 5C16.5 5 19.5 7 22 12C19.5 17 16.5 19 12 19C7.5 19 4.5 17 2 12Z"
                                stroke="currentColor"
                                strokeWidth="1.4"
                            />
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
                        </svg>
                        <span>{formatCount(news.views)} views</span>
                    </span>
                </div>
            </Link>
        </div>
    );
}
