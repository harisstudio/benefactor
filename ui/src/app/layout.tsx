import type { Metadata } from "next";
import { dmSans, outfit } from "@/lib/fonts";
import "./globals.css";

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
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
