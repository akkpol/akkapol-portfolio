import "../styles/globals.css";
import { Inter, Prompt } from "next/font/google";
import type { Metadata } from 'next';
import ErrorBoundary from "@/components/ErrorBoundary";
import Providers from "@/components/Providers";
import SiteBackground from "@/components/ui/SiteBackground";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | AK3 Studio",
    default: "AK3 Studio | IT & Tech Integrator สำหรับธุรกิจ SME กทม.-นนทบุรี",
  },
  description:
    "AI & Tech Integrator รับวางระบบ Business Automation และ AI Agent สำหรับ SME ในเขตกรุงเทพฯ นนทบุรี และปริมณฑล มุ่งเน้นการออกแบบ Intelligent Workflows ที่ช่วยลดต้นทุนและเพิ่มประสิทธิภาพ",
  keywords: [
    "IT Integrator",
    "Tech Integrator",
    "AI Agent",
    "Business Automation",
    "SME",
    "กรุงเทพฯ",
    "นนทบุรี",
    "Akkapol Kumpapug",
    "AK3 Studio",
  ],
  openGraph: {
    title: "AK3 Studio | IT & Tech Integrator สำหรับธุรกิจ SME",
    description: "รับวางระบบ Business Automation และ AI Agent สำหรับ SME",
    url: "https://akkapol-portfolio.vercel.app",
    siteName: "AK3 Studio",
    locale: "th_TH",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AK3 Studio",
  "image": "https://akkapol-portfolio.vercel.app/profile.jpg",
  "email": "akkapol.kumpapug@gmail.com",
  "telephone": "096-119-5161",
  "url": "https://akkapol-portfolio.vercel.app",
  "areaServed": [
    { "@type": "City", "name": "Bangkok" },
    { "@type": "City", "name": "Nonthaburi" }
  ],
  "founder": {
    "@type": "Person",
    "name": "Akkapol Kumpapug",
    "jobTitle": "IT & Tech Integrator"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning className={`${inter.variable} ${prompt.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-body text-text-primary antialiased selection:bg-accent-neon-blue/30 selection:text-accent-neon-blue" suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>
            <SiteBackground />
            <ScrollProgress />
            <Header />
            <main className="relative">{children}</main>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}

