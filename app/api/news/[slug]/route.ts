import { NextRequest, NextResponse } from 'next/server';
import type { NewsItem } from '@/types';

// In-memory storage for demonstration (since we can't modify the actual JSON file in production)
let newsDataCache: NewsItem[] | null = null;

// Import the data dynamically
async function getNewsData(): Promise<NewsItem[]> {
    if (newsDataCache) {
        return newsDataCache;
    }
    const data = await import('@/public/data.json');
    newsDataCache = [...(data.default || data)];
    return newsDataCache;
}

// Update the cache
function updateNewsCache(updatedNews: NewsItem[]) {
    newsDataCache = updatedNews;
}

interface RouteParams {
    params: Promise<{ slug: string }>;
}

/**
 * GET /api/news/[slug]
 * Returns a single news item by slug
 */
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { slug } = await params;
        const news = await getNewsData();
        const newsItem = news.find((item) => item.slug === slug);

        if (!newsItem) {
            return NextResponse.json(
                {
                    success: false,
                    error: `News with slug "${slug}" not found`,
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: newsItem,
        });
    } catch (error) {
        console.error('Error fetching news item:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch news item',
            },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/news/[slug]
 * Updates a news item's title and/or description ONLY
 * Returns error if trying to update other fields
 */
export async function PATCH(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        // Validate that only allowed fields are being updated
        const allowedFields = ['title', 'description'];
        const providedFields = Object.keys(body);
        const invalidFields = providedFields.filter(
            (field) => !allowedFields.includes(field)
        );

        if (invalidFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid fields: ${invalidFields.join(', ')}. Only 'title' and 'description' can be updated.`,
                },
                { status: 400 }
            );
        }

        // Check if at least one valid field is provided
        if (providedFields.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'No fields provided for update. Allowed fields: title, description',
                },
                { status: 400 }
            );
        }

        const news = await getNewsData();
        const newsIndex = news.findIndex((item) => item.slug === slug);

        if (newsIndex === -1) {
            return NextResponse.json(
                {
                    success: false,
                    error: `News with slug "${slug}" not found`,
                },
                { status: 404 }
            );
        }

        // Update the news item
        const updatedNewsItem: NewsItem = {
            ...news[newsIndex],
            ...(body.title && { title: body.title }),
            ...(body.description && { description: body.description }),
        };

        news[newsIndex] = updatedNewsItem;
        updateNewsCache(news);

        return NextResponse.json({
            success: true,
            data: updatedNewsItem,
            message: 'News updated successfully',
        });
    } catch (error) {
        console.error('Error updating news item:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update news item',
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/news/[slug]
 * Deletes a news item by slug
 */
export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { slug } = await params;
        const news = await getNewsData();
        const newsIndex = news.findIndex((item) => item.slug === slug);

        if (newsIndex === -1) {
            return NextResponse.json(
                {
                    success: false,
                    error: `News with slug "${slug}" not found`,
                },
                { status: 404 }
            );
        }

        // Remove the news item
        const deletedNews = news.splice(newsIndex, 1)[0];
        updateNewsCache(news);

        return NextResponse.json({
            success: true,
            data: deletedNews,
            message: 'News deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting news item:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to delete news item',
            },
            { status: 500 }
        );
    }
}
