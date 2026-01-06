import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Knowledge Articles",
  description: "Browse our knowledge base articles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="[scrollbar-gutter:stable]">
      <body className={geist.className} suppressHydrationWarning={true}>
        <div className="min-h-screen">
          <Header title="Knowledge Articles" />
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
