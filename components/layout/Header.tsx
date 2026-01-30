import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import type { Locale, Translations } from '@/types';

interface HeaderProps {
    locale: Locale;
    translations: Translations;
}

export default function Header({ locale, translations }: HeaderProps) {
    const { nav } = translations;

    return (
        <header className="flex items-center justify-between gap-4">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-cyan-300 via-emerald-300 to-sky-400 p-[1px] shadow-[0_0_30px_rgba(94,234,212,0.25)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#0b0d12] text-base font-bold text-white">
                        DN
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold text-white">{nav.title}</h1>
                    <p className="text-xs text-zinc-500">{nav.tagline}</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                            <circle
                                cx="11"
                                cy="11"
                                r="7"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M20 20L17 17"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                    <input
                        type="search"
                        placeholder={nav.searchPlaceholder}
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-cyan-300/40"
                    />
                </div>
            </div>

            {/* User Section & Language Switcher */}
            <div className="flex items-center gap-3">
                <LanguageSwitcher currentLocale={locale} />

                <div className="flex items-center gap-2.5">
                    <div className="rounded-full bg-gradient-to-br from-orange-400 to-amber-500 p-[2px]">
                        <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=96&h=96&q=80"
                            alt="User avatar"
                            className="h-9 w-9 rounded-full object-cover"
                        />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-white">Alex Rivera</p>
                        <p className="text-[11px] text-cyan-400">{nav.proMember}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
