import "../styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import Providers from "@/components/Providers";

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
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-300" suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
