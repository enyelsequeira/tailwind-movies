import { ThemeProvider } from "@/components/theme-provider";
import "../styles/main.css";

import { Alegreya, Source_Sans_Pro } from "next/font/google";
import Providers from "./query-provider";
import Layout from "@/components/layout-client";

const alegreya = Alegreya({
  variable: "--title",
  weight: ["400", "700", "900"],
});

const sourceSans = Source_Sans_Pro({
  variable: "--body",
  weight: ["200", "400", "600", "700", "300", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${alegreya.variable} ${sourceSans.variable}`}
    >
      <body className="h-full bg-light-background-primary dark:bg-dark-background-primary">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};
