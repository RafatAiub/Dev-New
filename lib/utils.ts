/**
 * Format large numbers to human-readable format
 * 2500 → 2.5K, 1000000 → 1M
 */
export function formatCount(value: string | number): string {
    const num = typeof value === 'string' ? parseInt(value, 10) : value;

    if (isNaN(num)) return '0';

    if (num >= 1000000) {
        const formatted = (num / 1000000).toFixed(1);
        // Remove trailing .0
        return formatted.endsWith('.0')
            ? formatted.slice(0, -2) + 'M'
            : formatted + 'M';
    }

    if (num >= 1000) {
        const formatted = (num / 1000).toFixed(1);
        // Remove trailing .0
        return formatted.endsWith('.0')
            ? formatted.slice(0, -2) + 'K'
            : formatted + 'K';
    }

    return num.toString();
}

/**
 * Format date to relative time (e.g., "1 day ago", "3 hours ago")
 */
export function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
        return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
    }
    if (diffInMonths > 0) {
        return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
    }
    if (diffInWeeks > 0) {
        return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
    }
    if (diffInDays > 0) {
        return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    }
    if (diffInHours > 0) {
        return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    }
    if (diffInMinutes > 0) {
        return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
    }
    return 'Just now';
}

/**
 * Format date to full readable format (e.g., "June 18, 2024")
 */
export function formatFullDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get image path - handles both relative and absolute paths
 */
export function getImagePath(imageName: string): string {
    if (imageName.startsWith('http')) {
        return imageName;
    }
    return `/images/${imageName}`;
}

/**
 * Create a URL-friendly slug from a string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

/**
 * Class name utility - combines class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
