import "../styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata = {
  title: "Akkapol Portfolio",
  description: "Personal profile powered by LinkedIn data"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-300" suppressHydrationWarning>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
