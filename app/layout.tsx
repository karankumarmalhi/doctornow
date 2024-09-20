import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "./context/AuthProvider";
import Footer from "@/components/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
      <body className={outfit.className}>
      <AuthProvider>
          <div className="md:px-20">
            <Navbar />
          </div>
          {children}
          <Toaster />
          <Footer/>
        </AuthProvider>
      </body>
      
    </html>
  );
}
