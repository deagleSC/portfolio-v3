# Portfolio — Supratik Chakraborty

Personal portfolio website showcasing my experience as a Full-Stack Software Engineer specializing in enterprise SaaS platforms and AI-powered solutions.

**Live:** [supratikch.vercel.app](https://supratikch.vercel.app)

---

## Overview

A performant, SEO-optimized portfolio built with modern web technologies. Features smooth animations, dark/light theme support, and a fully responsive design.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui, Radix UI
- **Animations:** Framer Motion
- **Deployment:** Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & config
├── components/
│   ├── sections/           # Hero, Experience, Projects, Contact
│   └── ui/                 # Reusable UI components
├── data/
│   └── data.json           # Portfolio content
└── types/                  # TypeScript definitions
```

## Configuration

### Content

All portfolio content is managed in `src/data/data.json`:

- Hero section (name, headline, bio)
- Work experience
- Projects
- Contact information

### Environment

```env
NEXT_PUBLIC_SITE_URL=https://supratikch.vercel.app
```

### Theme

Colors defined in `src/app/globals.css`:

- Light: Teal accent on light slate
- Dark: Cyan accent on dark slate

## SEO

- Meta tags and Open Graph
- Twitter Cards
- JSON-LD structured data
- Auto-generated sitemap
- robots.txt

## License

MIT

---

**Supratik Chakraborty**  
[LinkedIn](https://www.linkedin.com/in/supratikch/) · [GitHub](https://github.com/deagleSC) · [Email](mailto:supratikofficial1@gmail.com)
