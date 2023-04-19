import { ThemeProvider } from "@/components/theme-provider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

import "../styles/main.css";

import { Alegreya, Source_Sans_Pro } from "next/font/google";
import Providers from "./query-provider";
import Layout from "@/components/layout-client";
import { Metadata } from "next";

const alegreya = Alegreya({
  variable: "--title",
  weight: ["400", "700", "900"],
  subsets: ["latin-ext"],
});

const sourceSans = Source_Sans_Pro({
  variable: "--body",
  weight: ["200", "400", "600", "700", "300", "900"],
  subsets: ["latin-ext"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${alegreya.variable} ${sourceSans.variable}`}
    >
      <body className="h-full bg-light-background-primary dark:bg-dark-background-primary">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Layout session={session}>{children}</Layout>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Next 13 Movies",
  description:
    "Basic tailwind movies app, taking advantages of all the new APP dir from next JS 13",
  viewport: "width=device-width, initial-scale=1",
  applicationName: "Next 13 Movies by Enyel",
  keywords: [
    "movies",
    "tailwind",
    "next13",
    "app",
    "appDir",
    "server side",
    "client side",
    "react-query",
    "next-auth",
    "next-font",
    "next-metadata",
    "next-seo",
    "next-sitemap",
  ],
  openGraph: {
    images: [
      `${
        process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
      }/api/og`,
    ],
  },
  authors: [
    {
      name: "Enyel",
      url: "enyelsequeira.com",
    },
  ],
  icons: {
    icon: "/images/placeholder-min.png",
  },
};
// https://tailwind-movies.vercel.app/
