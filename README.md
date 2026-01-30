# 🚀 Dev News

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Signals from the builders shaping tomorrow.**

A modern, portfolio-ready news platform built with Next.js showcasing advanced routing concepts.

[Live Demo](#) • [Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started)

</div>

---

## 📸 Screenshots

<div align="center">
  <img src="./docs/home.png" alt="Home Page" width="80%" />
  <p><em>Premium dark theme with responsive news grid</em></p>
</div>

---

## ✨ Features

### 🎯 Core Features
- **📰 News Feed** - Dynamic news grid with premium dark theme
- **🔍 News Details** - Full article view with engagement stats
- **🌐 Internationalization** - Full Bengali (বাংলা) and English support
- **🔄 Modal Navigation** - Seamless modal experience via parallel routes

### 🛣️ Advanced Routing (Module 8)
- **📁 Project Organization** - Industry-standard file structure
- **🔀 Parallel Routes** - `@modal` slot for overlay content
- **🚦 Intercepting Routes** - `(.)news/[slug]` for modal on navigation
- **🔗 Combined Routes** - Modal on click, full page on reload
- **🛡️ Middleware** - Language detection and locale redirect
- **❌ Not Found Pages** - Global and route-specific 404 handling

### 🔌 API Routes
- `GET /api/news` - Fetch all news articles
- `GET /api/news/[slug]` - Fetch single article by slug
- `PATCH /api/news/[slug]` - Update title/description only
- `DELETE /api/news/[slug]` - Delete an article

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Fonts** | DM Sans, Sora (Google Fonts) |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```
dev-news/
├── app/
│   ├── api/
│   │   └── news/
│   │       ├── route.ts              # GET all news
│   │       └── [slug]/
│   │           └── route.ts          # GET/PATCH/DELETE by slug
│   ├── [locale]/
│   │   ├── layout.tsx                # Locale layout with @modal slot
│   │   ├── page.tsx                  # Home page
│   │   ├── not-found.tsx             # Locale 404 page
│   │   ├── @modal/
│   │   │   ├── default.tsx           # Default (no modal)
│   │   │   └── (.)news/[slug]/
│   │   │       └── page.tsx          # Intercepting route (modal)
│   │   └── news/[slug]/
│   │       ├── page.tsx              # Full news page
│   │       └── not-found.tsx         # News-specific 404
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Root redirect
│   ├── not-found.tsx                 # Global 404
│   └── globals.css                   # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── news/
│   │   ├── NewsGrid.tsx
│   │   └── NewsDetails.tsx
│   └── ui/
│       ├── NewsCard.tsx
│       └── Modal.tsx
├── lib/
│   ├── data.ts                       # Data fetching (dynamic import)
│   ├── i18n.ts                       # Translation utilities
│   └── utils.ts                      # Helper functions
├── locales/
│   ├── en.json                       # English translations
│   └── bn.json                       # Bengali translations
├── types/
│   └── index.ts                      # TypeScript definitions
├── middleware.ts                     # i18n middleware
└── public/
    ├── data.json                     # News data
    └── images/                       # News images
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dev-news.git
cd dev-news

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

---

## 🧪 API Testing

Test the API endpoints using curl:

```bash
# Get all news
curl http://localhost:3000/api/news

# Get single news
curl http://localhost:3000/api/news/the-css-if-function-has-arrived

# Update news (valid)
curl -X PATCH http://localhost:3000/api/news/the-css-if-function-has-arrived \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Update news (invalid - should fail)
curl -X PATCH http://localhost:3000/api/news/the-css-if-function-has-arrived \
  -H "Content-Type: application/json" \
  -d '{"author": "New Author"}'

# Delete news
curl -X DELETE http://localhost:3000/api/news/the-css-if-function-has-arrived
```

---

## 🌍 Internationalization

The app supports automatic language detection based on browser preferences:

| Language | Locale | Route |
|----------|--------|-------|
| English | `en` | `/en` |
| Bengali | `bn` | `/bn` |

The middleware automatically:
1. Detects browser language from `Accept-Language` header
2. Redirects to appropriate locale
3. Stores preference in cookie

---

## 🎨 Design System

### Color Palette
- **Background**: `#0b0d12`
- **Surface**: `#10131b`
- **Accent Cyan**: `#67e8f9`
- **Accent Emerald**: `#6ee7b7`

### Typography
- **Headings**: Sora (500-700)
- **Body**: DM Sans (400-600)

---

## 📝 Key Learnings

This project demonstrates:

1. **Parallel Routes** - Using `@modal` slot for overlay content
2. **Intercepting Routes** - `(.)` convention for same-level interception
3. **Middleware** - Request interception for i18n
4. **Dynamic Imports** - Loading JSON data without fetch
5. **Route Groups** - Organizing routes with `[locale]`
6. **Not Found Handling** - Custom 404 pages at multiple levels

---

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

---

<div align="center">

**Built with ❤️ for Reactive Accelerator**

</div>
