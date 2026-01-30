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
        { code: 'en' as Locale, label: 'EN', flag: '🇺🇸' },
        { code: 'bn' as Locale, label: 'বাং', flag: '🇧🇩' },
    ];

    return (
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {languages.map((lang) => (
                <Link
                    key={lang.code}
                    href={`/${lang.code}${pathWithoutLocale}`}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${currentLocale === lang.code
                            ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                </Link>
            ))}
        </div>
    );
}
