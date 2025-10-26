import "./globals.css";

export const metadata = {
  title: "Akkapol Portfolio",
  description: "Personal profile powered by LinkedIn data"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
