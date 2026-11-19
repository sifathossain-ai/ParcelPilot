import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ParcelPilot - AI Logistics & Steadfast Automation for Bangladesh",
  description: "AI-Assisted Address Structuring and Courier Booking Automation for Bangladeshi F-commerce Sellers",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-bg text-brand-dark antialiased min-h-screen selection:bg-brand-green/30 selection:text-brand-dark">
        {children}
      </body>
    </html>
  );
}
