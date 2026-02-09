import { headers } from "next/headers";
import { Roboto, Roboto_Slab, Roboto_Flex, Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import CookieBanner from "@/components/cookieBanner";
import "../../globals.css";

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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if this is a petsfriendz.com subdomain vs a custom domain
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "petsfriendz.com";

  // Only load Pets Friendz GA on our subdomains, not on custom domains
  // Custom domains will only have the user's own GA (loaded in page.tsx)
  const isSubdomain = host.endsWith(rootDomain);

  return (
    <html lang="en">
      <head>
        {isSubdomain && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${PETS_FRIENDZ_GA_ID}`}
            />
            <Script id="pets-friendz-profile-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${PETS_FRIENDZ_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${roboto.variable} ${robotoSlab.variable} ${robotoFlex.variable} ${fraunces.variable} ${inter.variable} antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
