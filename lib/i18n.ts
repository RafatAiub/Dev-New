import type { Locale, Translations } from '@/types';

// Cache for loaded translations
const translationCache: Partial<Record<Locale, Translations>> = {};

/**
 * Load translations for a specific locale
 */
export async function getTranslations(locale: Locale): Promise<Translations> {
    if (translationCache[locale]) {
        return translationCache[locale]!;
    }

    try {
        const translations = await import(`@/locales/${locale}.json`);
        translationCache[locale] = translations.default || translations;
        return translationCache[locale]!;
    } catch (error) {
        console.error(`Failed to load translations for locale: ${locale}`, error);
        // Fallback to English
        if (locale !== 'en') {
            return getTranslations('en');
        }
        throw error;
    }
}

/**
 * Get a specific translation value with optional interpolation
 * Example: t('notFound.newsNotFound', { slug: 'some-slug' })
 */
export function interpolate(
    template: string,
    values: Record<string, string>
): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
}

/**
 * Create a translation function for a specific locale
 */
export function createTranslator(translations: Translations) {
    return function t(
        key: string,
        values?: Record<string, string>
    ): string {
        const keys = key.split('.');
        let value: unknown = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        if (typeof value !== 'string') {
            console.warn(`Translation value is not a string: ${key}`);
            return key;
        }

        if (values) {
            return interpolate(value, values);
        }

        return value;
    };
}

/**
 * Get locale from pathname
 */
export function getLocaleFromPath(pathname: string): Locale {
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0];

    if (locale === 'en' || locale === 'bn') {
        return locale;
    }

    return 'en';
}

/**
 * Remove locale prefix from pathname
 */
export function removeLocaleFromPath(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0];

    if (locale === 'en' || locale === 'bn') {
        return '/' + segments.slice(1).join('/');
    }

    return pathname;
}

/**
 * Add locale prefix to pathname
 */
export function addLocaleToPath(pathname: string, locale: Locale): string {
    const cleanPath = removeLocaleFromPath(pathname);
    return `/${locale}${cleanPath}`;
}
