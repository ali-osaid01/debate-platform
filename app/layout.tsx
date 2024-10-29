import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import ReactQueryProvider from "@/provider/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Debate Website",
  description: "Debate Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body>
          {children}
        </body>
      </ReactQueryProvider>
      <Toaster richColors position="top-right" />
    </html>
  );
}
