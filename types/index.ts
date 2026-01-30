// News item type definition
export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  author_name: string;
  author_avatar: string;
  published_date: string;
  tags: string[];
  upvotes: string;
  downvotes: string;
  views: string;
  thumbnail: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Translation keys type
export interface Translations {
  nav: {
    title: string;
    tagline: string;
    searchPlaceholder: string;
    proMember: string;
  };
  home: {
    trendingToday: string;
    trendingDescription: string;
  };
  news: {
    backToHome: string;
    published: string;
    engagement: string;
    upvotes: string;
    downvotes: string;
    views: string;
    tags: string;
    author: string;
    publishedOn: string;
  };
  notFound: {
    title: string;
    message: string;
    newsNotFound: string;
    backToHome: string;
  };
  footer: {
    copyright: string;
    about: string;
    privacy: string;
    terms: string;
  };
  common: {
    loading: string;
    error: string;
  };
}

// Supported locales
export type Locale = 'en' | 'bn';

export const locales: Locale[] = ['en', 'bn'];
export const defaultLocale: Locale = 'en';
