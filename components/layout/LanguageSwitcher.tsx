'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/types';

interface LanguageSwitcherProps {
    currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
    const pathname = usePathname();

    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(/^\/(en|bn)/, '') || '/';

    const languages = [
        { code: 'en' as Locale, label: 'EN' },
        { code: 'bn' as Locale, label: 'বাং' },
    ];

    return (
        <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/5 p-0.5">
            {languages.map((lang) => (
                <Link
                    key={lang.code}
                    href={`/${lang.code}${pathWithoutLocale}`}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${currentLocale === lang.code
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                >
                    {lang.label}
                </Link>
            ))}
        </div>
    );
}
