import type { Metadata } from "next";
import { Roboto, Roboto_Slab, Roboto_Flex } from "next/font/google";
import Script from "next/script";
import CookieBanner from "@/components/cookieBanner";
import "../globals.css";

const PETS_FRIENDZ_GA_ID = 'G-MHEDX43G79';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.petsfriendz.com'),
  title: "Pets Friendz Pages",
  description: "Build your pet sitting website in minutes with a clean, professional template",
  icons: {
    icon: "/logo.svg",
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${PETS_FRIENDZ_GA_ID}`}
        />
        <Script id="pets-friendz-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${PETS_FRIENDZ_GA_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${roboto.variable} ${robotoSlab.variable} ${robotoFlex.variable} antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
