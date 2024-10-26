import localFont from "next/font/local";
import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import ReactQueryProvider from "@/provider/ReactQueryProvider";

export const metadata: Metadata = {
    title: "Debate Website",
    description: "Debate Website",
  };
  
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
             <ReactQueryProvider>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
      </ReactQueryProvider>
        <Toaster richColors position="top-right"/>
    </html>
  );
}
