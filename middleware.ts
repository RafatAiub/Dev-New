import { NextRequest, NextResponse } from 'next/server';

// Supported locales
const locales = ['en', 'bn'];
const defaultLocale = 'en';

// Get preferred locale from Accept-Language header
function getPreferredLocale(request: NextRequest): string {
    // Check for locale cookie first
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }

    // Parse Accept-Language header
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
        // Parse the header and find the best match
        const languages = acceptLanguage
            .split(',')
            .map((lang) => {
                const [code, quality] = lang.trim().split(';q=');
                return {
                    code: code.split('-')[0].toLowerCase(),
                    quality: quality ? parseFloat(quality) : 1,
                };
            })
            .sort((a, b) => b.quality - a.quality);

        for (const lang of languages) {
            if (locales.includes(lang.code)) {
                return lang.code;
            }
            // Check for Bengali variations
            if (lang.code === 'bn' || lang.code === 'ben') {
                return 'bn';
            }
        }
    }

    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for API routes, static files, and Next.js internals
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/images') ||
        pathname.includes('.') // Static files with extensions
    ) {
        return NextResponse.next();
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        // Extract locale and set cookie
        const locale = pathname.split('/')[1];
        const response = NextResponse.next();
        response.cookies.set('NEXT_LOCALE', locale, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
        });
        return response;
    }

    // Redirect to preferred locale
    const locale = getPreferredLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    const response = NextResponse.redirect(newUrl);
    response.cookies.set('NEXT_LOCALE', locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
    });

    return response;
}

export const config = {
    // Match all paths except static files and API routes
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
