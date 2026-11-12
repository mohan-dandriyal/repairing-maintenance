import type { Metadata } from "next";
import { footerContent } from "@/types/templates.types";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cormorant, poppins } from "@/fonts/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: footerContent.footer.brand.logoAlt,
  description: footerContent.footer.brand.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
       
        {/* ========== main body start ======== */}
        {children}
        {/* ========== main body end ======== */}

   
      </body>
    </html>
  );
}
