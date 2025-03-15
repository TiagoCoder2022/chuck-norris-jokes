import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: "Norris Jokes",
  description: "Funny jokes by the master Norris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <body className="bg-dark-1">       
        {children}        
      </body>
    </html>
  );
}
