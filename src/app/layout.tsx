import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { Toaster } from "sonner";
import QueryProvider from "../providers/queryProvider";
import StoreProvider from "../providers/storeProvider";


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
      <body >
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
