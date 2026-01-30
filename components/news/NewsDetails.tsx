import type { NewsItem, Translations } from '@/types';
import { formatCount, formatFullDate, getImagePath } from '@/lib/utils';

interface NewsDetailsProps {
    news: NewsItem;
    translations: Translations;
}

export default function NewsDetails({ news, translations }: NewsDetailsProps) {
    const t = translations.news;

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Main Article */}
            <article className="card-gradient rounded-2xl reveal">
                <div className="rounded-2xl surface p-6 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                    {/* Title */}
                    <h3 className="text-3xl font-semibold text-white">{news.title}</h3>

                    {/* Description Preview */}
                    <p className="mt-3 text-base text-zinc-300">{news.description}</p>

                    {/* Author & Date */}
                    <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                        <div className="flex items-center gap-2">
                            <img
                                src={getImagePath(news.author_avatar)}
                                alt={news.author_name}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-white">
                                {news.author_name}
                            </span>
                        </div>
                        <span className="text-xs text-zinc-500">•</span>
                        <span>
                            {t.publishedOn} {formatFullDate(news.published_date)}
                        </span>
                    </div>

                    {/* Thumbnail */}
                    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                        <img
                            src={getImagePath(news.thumbnail)}
                            alt={news.title}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-300">
                        {news.description.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
                {/* Engagement Stats */}
                <div
                    className="card-gradient rounded-2xl reveal"
                    style={{ animationDelay: '120ms' }}
                >
                    <div className="rounded-2xl surface p-5 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                        <h4 className="text-sm font-semibold text-white">{t.engagement}</h4>
                        <div className="mt-4 space-y-3 text-sm text-zinc-300">
                            {/* Upvotes */}
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-4 w-4 text-emerald-300"
                                    >
                                        <path
                                            d="M12 4L5 11H9V20H15V11H19L12 4Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    {t.upvotes}
                                </span>
                                <span className="text-white">{formatCount(news.upvotes)}</span>
                            </div>
                            {/* Downvotes */}
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-4 w-4 text-rose-300"
                                    >
                                        <path
                                            d="M12 20L19 13H15V4H9V13H5L12 20Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    {t.downvotes}
                                </span>
                                <span className="text-white">{formatCount(news.downvotes)}</span>
                            </div>
                        </div>
                        {/* Views */}
                        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-400">
                            <span className="flex items-center gap-2">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-4 w-4 text-zinc-500"
                                >
                                    <path
                                        d="M2 12C4.5 7 7.5 5 12 5C16.5 5 19.5 7 22 12C19.5 17 16.5 19 12 19C7.5 19 4.5 17 2 12Z"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                    />
                                </svg>
                                {t.views}
                            </span>
                            <span className="text-white">{formatCount(news.views)}</span>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div
                    className="card-gradient rounded-2xl reveal"
                    style={{ animationDelay: '200ms' }}
                >
                    <div className="rounded-2xl surface p-5 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                        <h4 className="text-sm font-semibold text-white">{t.tags}</h4>
                        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-cyan-200/80">
                            {news.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Author Info */}
                <div
                    className="card-gradient rounded-2xl reveal"
                    style={{ animationDelay: '280ms' }}
                >
                    <div className="rounded-2xl surface p-5 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                        <h4 className="text-sm font-semibold text-white">{t.author}</h4>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="rounded-full bg-white/10 p-[2px]">
                                <img
                                    src={getImagePath(news.author_avatar)}
                                    alt={news.author_name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {news.author_name}
                                </p>
                                <p className="text-xs text-zinc-400">Content Creator</p>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-zinc-400">
                            {t.publishedOn}{' '}
                            <time dateTime={news.published_date}>
                                {formatFullDate(news.published_date)}
                            </time>
                        </p>
                    </div>
                </div>
            </aside>
        </div>
    );
}
