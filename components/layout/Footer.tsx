import type { Translations } from '@/types';

interface FooterProps {
    translations: Translations;
}

export default function Footer({ translations }: FooterProps) {
    const { footer } = translations;

    return (
        <footer className="mt-16 border-t border-white/10 py-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-zinc-400">{footer.copyright}</p>
                <nav className="flex items-center gap-6 text-sm text-zinc-400">
                    <a href="#" className="transition hover:text-white">
                        {footer.about}
                    </a>
                    <a href="#" className="transition hover:text-white">
                        {footer.privacy}
                    </a>
                    <a href="#" className="transition hover:text-white">
                        {footer.terms}
                    </a>
                </nav>
            </div>
        </footer>
    );
}
