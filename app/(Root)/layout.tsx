import ReactQueryProvider from "@/provider/ReactQueryProvider";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

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
        <Footer/>
      </body>
       </ReactQueryProvider>
    </html>
  );
}
