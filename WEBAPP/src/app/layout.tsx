import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rizzora.com"),
  title: "Rizzora - Chat with Chris",
  description: "A private romantic AI companion experience.",
  openGraph: {
    title: "Rizzora - Chat with Chris",
    description: "Where every spark gets a reply.",
    images: ["/assets/chris-entry.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#191833"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
