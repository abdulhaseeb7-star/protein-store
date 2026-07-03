import "./globals.css";
import { Inter, Anton } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" });

export const metadata = {
  title: "Nutri-Imports",
  description: "Fuel your greatness — premium protein supplements",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${anton.variable}`}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}