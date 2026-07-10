import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name}, ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Camtinel",
    "Camtinel Cameroon",
    "Camtinel app",
    "Camtinel APK",
    "cybersecurity Cameroon",
    "phishing detection",
    "Mobile Money fraud",
    "offline AI",
    "Android security",
    "explainable AI",
    "on-device AI",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name}, ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "uwU2kYNCXMcBEae2PI4fYHxDNCkhthy_-9cPQHowsDM",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: [
      "Camtinel Cameroon",
      "Camtinel App",
      "Camtinel Cybersecurity",
    ],
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description: site.description,
    email: site.contact,
    foundingLocation: {
      "@type": "Place",
      name: "Cameroon",
    },
    areaServed: {
      "@type": "Country",
      name: "Cameroon",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: "Camtinel Cameroon",
    url: siteUrl,
    inLanguage: ["en", "fr"],
    publisher: { "@type": "Organization", name: site.name },
  },
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: site.name,
    operatingSystem: "Android 8+",
    applicationCategory: "SecurityApplication",
    description: site.description,
    url: `${siteUrl}/#download`,
    downloadUrl: `${siteUrl}/camtinel.apk`,
    softwareVersion: site.version,
    inLanguage: ["en", "fr"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "XAF",
    },
    publisher: { "@type": "Organization", name: site.name },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
