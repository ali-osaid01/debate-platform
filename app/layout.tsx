import { Metadata } from "next";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Suspense } from "react";

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
      <body>
        <main>
          <ReactQueryProvider>
              <Toaster position="top-right" richColors key={"toaster"} />
              <Suspense fallback={<div>loading...</div>}>
            {children}
              </Suspense>
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
