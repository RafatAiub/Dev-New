import { NewsItem } from '@/types';

/**
 * Dynamically import news data from public/data.json
 * As required by the assignment - using dynamic import instead of fetch
 */
export async function getNewsData(): Promise<NewsItem[]> {
    try {
        // Dynamic import of the JSON data
        const data = await import('@/public/data.json');
        return data.default || data;
    } catch (error) {
        console.error('Failed to load news data:', error);
        return [];
    }
}

/**
 * Get a single news item by slug
 */
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
    const news = await getNewsData();
    return news.find((item) => item.slug === slug) || null;
}

/**
 * Get all news slugs for static generation
 */
export async function getAllNewsSlugs(): Promise<string[]> {
    const news = await getNewsData();
    return news.map((item) => item.slug);
}
