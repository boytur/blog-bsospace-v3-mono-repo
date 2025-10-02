import type { Metadata, Viewport } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

import Layout from "./components/layout";
import { AuthProvider } from "./contexts/auth-context";
import Providers from "./components/providers";
import envConfig from "./configs/env-config";

// const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster"
import { SEOProvider } from "./contexts/seo-context";
import HelmetContextProvider from "./contexts/helmet-provider";
import CookiesConsentProvider from "./contexts/cookies-consent-context";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(envConfig.domain),
  title: {
    default: "BSO Blog - Software Engineering Knowledge Hub",
    template: `%s | ${envConfig.organizationName} Blog`
  },
  description:
    "BSO Blog is a collaborative blogging platform created by Software Engineering students, aimed at sharing knowledge, cutting-edge techniques, and real-world experiences in software development, programming, and technology.",
  keywords: [
    "software engineering",
    "programming",
    "technology",
    "blog",
    "coding",
    "development",
    envConfig.organizationName,
    "student projects",
    "tech knowledge"
  ],
  authors: [{ name: `${envConfig.organizationName} Team` }],
  creator: envConfig.organizationName,
  publisher: envConfig.organizationName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  alternates: {
    canonical: envConfig.domain,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: envConfig.domain,
    title: "BSO Blog - Software Engineering Knowledge Hub",
    description:
      "BSO Blog is a collaborative blogging platform created by Software Engineering students, aimed at sharing knowledge, cutting-edge techniques, and real-world experiences.",
    siteName: `${envConfig.organizationName} Blog`,
    images: [
      {
        url: `${envConfig.domain}/logo.webp`,
        width: 1200,
        height: 630,
        alt: "BSO Blog - Software Engineering Knowledge Hub",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BSO Blog - Software Engineering Knowledge Hub",
    description:
      "BSO Blog is a collaborative blogging platform created by Software Engineering students, aimed at sharing knowledge, cutting-edge techniques, and real-world experiences.",
    images: [`${envConfig.domain}/logo.webp`],
    creator: "@bsospace", // Add your Twitter handle
    site: "@bsospace", // Add your Twitter handle
  },
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="BSO Blog" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BSO Blog" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-sans">{/* inter.className */}
        <HelmetContextProvider>
          <SEOProvider>
            <CookiesConsentProvider>
            <AuthProvider>
              <Providers>
                <Toaster />
                <Layout>{children}</Layout>
              </Providers>
            </AuthProvider>
            </CookiesConsentProvider>
          </SEOProvider>
        </HelmetContextProvider>
      </body>
    </html >
  );
}
