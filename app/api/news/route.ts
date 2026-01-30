import { NextResponse } from 'next/server';
import type { NewsItem } from '@/types';

// Import the data dynamically
async function getNewsData(): Promise<NewsItem[]> {
    const data = await import('@/public/data.json');
    return data.default || data;
}

/**
 * GET /api/news
 * Returns all news items
 */
export async function GET() {
    try {
        const news = await getNewsData();

        return NextResponse.json({
            success: true,
            data: news,
            total: news.length,
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch news data',
            },
            { status: 500 }
        );
    }
}
