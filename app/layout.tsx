import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Kimathi & Partners | Leading Corporate Law Firm in Ghana",
  description:
    "Tier 1 ranked corporate law firm in Ghana by Legal 500. Serving Fortune 500 companies, global multinationals, and foreign governments with excellence in M&A, banking, finance, energy, and dispute resolution.",
  keywords: [
    "law firm Ghana",
    "corporate lawyers Ghana",
    "M&A lawyers Ghana",
    "banking law Ghana",
    "energy law Ghana",
    "dispute resolution Ghana",
    "Kimathi & Partners",
    "top law firm Ghana",
    "Legal 500 Ghana",
    "Chambers & Partners Ghana",
  ],
  authors: [{ name: "Kimathi & Partners" }],
  creator: "Kimathi & Partners",
  publisher: "Kimathi & Partners",
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://kimathilegal.com",
    siteName: "Kimathi & Partners",
    title: "Kimathi & Partners | Leading Corporate Law Firm in Ghana",
    description: "Tier 1 ranked corporate law firm in Ghana serving Fortune 500 companies and global multinationals.",
    images: [
      {
        url: "https://www.kimathilegal.com/images/kimathi_logo.png",
        width: 1200,
        height: 630,
        alt: "Kimathi & Partners Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kimathi & Partners | Leading Corporate Law Firm in Ghana",
    description: "Tier 1 ranked corporate law firm in Ghana serving Fortune 500 companies and global multinationals.",
    images: ["https://www.kimathilegal.com/images/kimathi_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://kimathilegal.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Toaster richColors position="top-right" closeButton={true} />
        <Footer />
      </body>
    </html>
  )
}
