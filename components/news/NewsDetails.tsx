import type { NewsItem, Translations } from '@/types';
import { formatCount, formatFullDate, getImagePath } from '@/lib/utils';

interface NewsDetailsProps {
    news: NewsItem;
    translations: Translations;
}

export default function NewsDetails({ news, translations }: NewsDetailsProps) {
    const t = translations.news;

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* Main Article */}
            <article className="rounded-2xl bg-[#10131a] border border-white/[0.08] overflow-hidden">
                <div className="p-8">
                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        {news.title}
                    </h1>

                    {/* Description Preview */}
                    <p className="mt-4 text-base text-zinc-300 leading-relaxed">
                        {news.description}
                    </p>

                    {/* Author & Date */}
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={getImagePath(news.author_avatar)}
                                alt={news.author_name}
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10"
                            />
                            <span className="text-sm font-medium text-white">
                                {news.author_name}
                            </span>
                        </div>
                        <span className="text-zinc-600">•</span>
                        <span className="text-sm text-zinc-500">
                            {t.publishedOn} {formatFullDate(news.published_date)}
                        </span>
                    </div>

                    {/* Thumbnail */}
                    <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
                        <img
                            src={getImagePath(news.thumbnail)}
                            alt={news.title}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="mt-8 space-y-4 text-base leading-7 text-zinc-300">
                        {news.description.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
                {/* Engagement Stats Card */}
                <div className="rounded-2xl bg-[#10131a] border border-white/[0.08] p-6">
                    <h2 className="text-base font-bold text-white mb-5">{t.engagement}</h2>

                    <div className="space-y-4">
                        {/* Upvotes */}
                        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                            <span className="flex items-center gap-3">
                                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-500/20">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-emerald-400">
                                        <path d="M12 4L5 11H9V20H15V11H19L12 4Z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-zinc-300">{t.upvotes}</span>
                            </span>
                            <span className="text-lg font-bold text-emerald-400">{formatCount(news.upvotes)}</span>
                        </div>

                        {/* Downvotes */}
                        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-rose-500/10 border border-rose-400/20">
                            <span className="flex items-center gap-3">
                                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-rose-500/20">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-rose-400">
                                        <path d="M12 20L19 13H15V4H9V13H5L12 20Z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-zinc-300">{t.downvotes}</span>
                            </span>
                            <span className="text-lg font-bold text-rose-400">{formatCount(news.downvotes)}</span>
                        </div>

                        {/* Views */}
                        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-zinc-500/10 border border-zinc-600/20">
                            <span className="flex items-center gap-3">
                                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-zinc-500/20">
                                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-zinc-400">
                                        <path
                                            d="M2 12C4.5 7 7.5 5 12 5C16.5 5 19.5 7 22 12C19.5 17 16.5 19 12 19C7.5 19 4.5 17 2 12Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-zinc-300">{t.views}</span>
                            </span>
                            <span className="text-lg font-bold text-zinc-300">{formatCount(news.views)}</span>
                        </div>
                    </div>
                </div>

                {/* Tags Card */}
                <div className="rounded-2xl bg-[#10131a] border border-white/[0.08] p-6">
                    <h2 className="text-base font-bold text-white mb-5">{t.tags}</h2>
                    <div className="flex flex-wrap gap-2">
                        {news.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-lg bg-cyan-500/15 border border-cyan-400/25 px-4 py-2 text-sm font-medium text-cyan-300"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Author Card */}
                <div className="rounded-2xl bg-[#10131a] border border-white/[0.08] p-6">
                    <h2 className="text-base font-bold text-white mb-5">{t.author}</h2>
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 p-[2px]">
                            <img
                                src={getImagePath(news.author_avatar)}
                                alt={news.author_name}
                                className="h-14 w-14 rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-white">
                                {news.author_name}
                            </p>
                            <p className="text-sm text-cyan-400 mt-0.5">Content Creator</p>
                        </div>
                    </div>
                    <div className="mt-5 pt-5 border-t border-white/10">
                        <p className="text-sm text-zinc-400">
                            {t.publishedOn}{' '}
                            <time dateTime={news.published_date} className="text-white font-medium">
                                {formatFullDate(news.published_date)}
                            </time>
                        </p>
                    </div>
                </div>
            </aside>
        </div>
    );
}
