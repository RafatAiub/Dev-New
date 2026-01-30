import Link from 'next/link';
import type { Locale } from '@/types';
import { getTranslations } from '@/lib/i18n';

interface LocaleNotFoundProps {
    params?: Promise<{ locale: Locale }>;
}

export default async function LocaleNotFound({ params }: LocaleNotFoundProps) {
    // Default to 'en' if params not available
    const locale = params ? (await params).locale : 'en';
    const translations = await getTranslations(locale);
    const { notFound: t } = translations;

    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="card-gradient rounded-2xl p-[1px]">
                <div className="rounded-2xl surface p-12 shadow-[0_24px_50px_rgba(5,8,16,0.55)]">
                    {/* 404 Badge */}
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20">
                        <span className="text-4xl font-bold text-white">404</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white">{t.title}</h1>

                    {/* Message */}
                    <p className="mt-4 text-lg text-zinc-400 max-w-md">
                        {t.message}
                    </p>

                    {/* Back Button */}
                    <Link
                        href={`/${locale}`}
                        className="btn mt-8 inline-flex"
                    >
                        ← {t.backToHome}
                    </Link>
                </div>
            </div>
        </div>
    );
}
