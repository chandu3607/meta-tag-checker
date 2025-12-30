import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "MetaTagsChecker - Preview, Edit & Generate Meta Tags",
  description:
    "Free tool to preview, edit and generate meta tags for your website. See how your site appears on Google, Facebook, X, LinkedIn and more!",
  openGraph: {
    type: "website",
    url: "https://metatagschecker.app",
    title: "MetaTagsChecker - Preview, Edit & Generate Meta Tags",
    description:
      "Free tool to preview, edit and generate meta tags for your website. See how your site appears on Google, Facebook, X, LinkedIn and more!",
    siteName: "MetaTagsChecker",
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaTagsChecker - Preview, Edit & Generate Meta Tags",
    description:
      "Free tool to preview, edit and generate meta tags for your website. See how your site appears on Google, Facebook, X, LinkedIn and more!",
  },
  icons: {
    icon: "/favicon.svg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${jetBrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
