import type { Metadata, Viewport } from "next";
import { inter, manrope } from "@/lib/fonts";
import { LanguageProvider } from "@/context/LanguageContext";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E3347",
};

export const metadata: Metadata = {
  title: "Benefactor — World Wide Fundraising Platform",
  description:
    "Benefactor is a worldwide fundraising platform. Start a fundraiser, donate to causes you care about, and make a difference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <LocaleProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
