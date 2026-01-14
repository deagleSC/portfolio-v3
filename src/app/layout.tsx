import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import portfolioData from "@/data/data.json";
import { ThemeProvider } from "@/components/theme-provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://supratikch.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// SEO-optimized description - Name first for better ranking
// Differentiated from academic Supratik Chakraborty (IIT Bombay professor) by emphasizing:
// - Software Engineering (not computer science research)
// - Full-Stack Development (not formal methods)
// - Industry experience (Trumio, not academia)
// - Specific tech stack and location (Kolkata)
const seoDescription =
  "Supratik Chakraborty - Full-Stack Software Engineer from Kolkata, India. Building enterprise SaaS platforms and AI-powered solutions at Trumio. Expert in FastAPI, React, Next.js, Python, MongoDB, and Azure. Specializing in multi-tenant architectures, RBAC, and LLM integrations. Industry software engineer (not to be confused with IIT Bombay professor).";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // Name-first title for better search ranking
    // Added differentiation: "Software Engineer" (not "Computer Scientist")
    // Added location context: "Kolkata" to differentiate from IIT Bombay professor
    default:
      "Supratik Chakraborty | Full-Stack Software Engineer | Kolkata, India | Trumio",
    template: `%s | Supratik Chakraborty`,
  },
  description: seoDescription,
  keywords: [
    // PRIMARY: Name variations (highest priority)
    // Differentiated keywords to rank above academic namesake
    "Supratik",
    "Supratik Chakraborty",
    "Supratik C",
    "supratikch",
    "Supratik Chakraborty portfolio",
    "Supratik Chakraborty software engineer",
    "Supratik Chakraborty developer",
    "Supratik Chakraborty Trumio",
    "Supratik Chakraborty Kolkata",
    "Supratik Chakraborty India",
    "Supratik Chakraborty full stack",
    "Supratik Chakraborty fullstack",
    "Supratik Chakraborty web developer",
    "Supratik Chakraborty industry",
    "Supratik Chakraborty not IIT Bombay",
    "Supratik Chakraborty software engineer not professor",
    // PRIMARY: Role keywords
    "Software Engineer",
    "Full Stack Developer",
    "Full Stack Software Engineer",
    "Software Developer",
    "Web Developer",
    "Backend Developer",
    "Frontend Developer",
    // Location-based
    "Software Engineer India",
    "Software Engineer Kolkata",
    "Full Stack Developer India",
    "Remote Software Engineer",
    // Technical skills
    "FastAPI developer",
    "React developer",
    "Python developer",
    "Next.js developer",
    "TypeScript developer",
    "MongoDB developer",
    "Azure developer",
    "Node.js developer",
    // Domain expertise
    "Enterprise SaaS developer",
    "AI engineer",
    "LLM integration developer",
    "Multi-tenant architecture",
    "RBAC implementation",
    // Tech stack
    "FastAPI",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
    "MongoDB",
    "Azure",
    "Docker",
    "Node.js",
    "Vite",
  ],
  authors: [{ name: portfolioData.hero.name, url: siteUrl }],
  creator: portfolioData.hero.name,
  publisher: portfolioData.hero.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Supratik Chakraborty - Software Engineer Portfolio",
    title:
      "Supratik Chakraborty | Full-Stack Software Engineer | AI & Enterprise SaaS",
    description: seoDescription,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 1200,
        alt: "Supratik Chakraborty - Full-Stack Software Engineer",
      },
      {
        url: `${siteUrl}${portfolioData.hero.image}`,
        width: 1200,
        height: 1200,
        alt: "Supratik Chakraborty - Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supratik Chakraborty | Full-Stack Software Engineer",
    description: seoDescription,
    images: [
      `${siteUrl}/twitter-image`,
      `${siteUrl}${portfolioData.hero.image}`,
    ],
    site: "@supratikch",
    creator: "@supratikch",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  verification: {
    // Get this from Google Search Console after verification
    // google: "your-google-site-verification-code",
    // Get this from Bing Webmaster Tools
    // bing: "your-bing-verification-code",
  },
  other: {
    "linkedin:author": "https://www.linkedin.com/in/supratikch/",
    "github:author": "https://github.com/deagleSC",
  },
};

// JSON-LD Structured Data for Person (enhanced)
// Added alternateName, additionalType, and more specific identifiers
// to differentiate from academic namesake
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Person", "SoftwareDeveloper"],
  "@id": `${siteUrl}/#person`,
  name: portfolioData.hero.name,
  alternateName: ["supratikch", "deagleSC", "Supratik C"],
  givenName: "Supratik",
  familyName: "Chakraborty",
  url: siteUrl,
  image: {
    "@type": "ImageObject",
    url: `${siteUrl}${portfolioData.hero.image}`,
    width: 400,
    height: 400,
  },
  jobTitle: "Full-Stack Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Trumio",
    url: "https://trumio.com",
  },
  description: seoDescription,
  email: "supratikofficial1@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "India",
  },
  sameAs: [
    "https://github.com/deagleSC",
    "https://www.linkedin.com/in/supratikch/",
    siteUrl,
  ],
  knowsAbout: [
    "Full-Stack Development",
    "Enterprise SaaS Platforms",
    "Multi-tenant Architecture",
    "RBAC Implementation",
    "FastAPI",
    "Python",
    "React",
    "Next.js",
    "TypeScript",
    "MongoDB",
    "Azure Cloud",
    "Docker",
    "LLM Integration",
    "AI-powered Applications",
    "REST APIs",
    "Analytics Infrastructure",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "West Bengal University of Technology",
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressCountry: "India",
      },
    },
  },
  nationality: {
    "@type": "Country",
    name: "India",
  },
};

// JSON-LD for WebSite
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: `${portfolioData.hero.name} - Portfolio`,
  description: seoDescription,
  publisher: {
    "@id": `${siteUrl}/#person`,
  },
  inLanguage: "en-US",
};

// JSON-LD for Professional Service
const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#service`,
  name: `${portfolioData.hero.name} - Software Engineering Services`,
  description:
    "Full-stack software engineering services specializing in enterprise SaaS platforms, multi-tenant architectures, and AI-powered solutions.",
  provider: {
    "@id": `${siteUrl}/#person`,
  },
  areaServed: "Worldwide",
  serviceType: [
    "Full-Stack Development",
    "Enterprise SaaS Development",
    "API Development",
    "Frontend Development",
    "Backend Development",
    "AI Integration",
  ],
};

// JSON-LD for BreadcrumbList (helps with search result display)
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              personJsonLd,
              websiteJsonLd,
              professionalServiceJsonLd,
              breadcrumbJsonLd,
            ]),
          }}
        />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
