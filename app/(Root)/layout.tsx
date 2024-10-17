import ReactQueryProvider from "@/provider/ReactQueryProvider";
import "../globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <ReactQueryProvider>
      <body>
          <Navbar/>
        {children}
      </body>
       </ReactQueryProvider>
    </html>
  );
}
