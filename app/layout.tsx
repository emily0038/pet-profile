import type { Metadata } from "next";
import { Roboto, Roboto_Slab, Roboto_Flex } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  weight: ["300", "500"],
});

export const metadata: Metadata = {
  title: "Pets Friendz Pages",
  description: "Find your new pet sitter",
  icons: {
    icon: "/logo.svg",
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
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-K9QK4B1LR0"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K9QK4B1LR0');
          `}
        </Script>
      </head>
      <body
        className={`${roboto.variable} ${robotoSlab.variable} ${robotoFlex.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
