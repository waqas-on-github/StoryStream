import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { Toaster } from "sonner";
import QueryProvider from "../contexts/queryProvider";
import StoreProvider from "../contexts/storeProvider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <StoreProvider>
        <QueryProvider>
        <Navbar>
          {children}
        </Navbar>
        </QueryProvider>
        </StoreProvider>
        <Toaster />

      </body>
    </html>
  );
}
