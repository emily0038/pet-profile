import Script from "next/script";

const PETS_FRIENDZ_GA_ID = 'G-MHEDX43G79';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${PETS_FRIENDZ_GA_ID}`}
      />
      <Script id="pets-friendz-blog-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${PETS_FRIENDZ_GA_ID}');
        `}
      </Script>
      {children}
    </>
  );
}
