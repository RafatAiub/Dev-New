import { notFound } from 'next/navigation';
import type { Locale } from '@/types';
import { getTranslations } from '@/lib/i18n';
import { getNewsBySlug } from '@/lib/data';
import Modal from '@/components/ui/Modal';
import NewsDetails from '@/components/news/NewsDetails';

interface ModalNewsPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export default async function ModalNewsPage({ params }: ModalNewsPageProps) {
    const { locale, slug } = await params;
    const validLocale = (locale === 'bn' ? 'bn' : 'en') as Locale;
    const [translations, news] = await Promise.all([
        getTranslations(validLocale),
        getNewsBySlug(slug),
    ]);

    if (!news) {
        notFound();
    }

    return (
        <Modal>
            <NewsDetails news={news} translations={translations} />
        </Modal>
    );
}
