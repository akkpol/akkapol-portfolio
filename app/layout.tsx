import "../styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import Providers from "@/components/Providers";
import SiteBackground from "@/components/ui/SiteBackground";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Header } from "@/components/layout/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Akkapol Portfolio",
  description: "Personal profile powered by LinkedIn data"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-background font-body text-text-primary antialiased" suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>
            <SiteBackground />
            <ScrollProgress />
            <Header />
            <main className="relative">{children}</main>
          </Providers>
        </ErrorBoundary>
        <SpeedInsights />
      </body>
    </html>
  );
}
