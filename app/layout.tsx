import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

export const metadata: Metadata = {
  title: "kyuc° — Keep your family's stories alive",
  description: "Small conversations. A lasting connection. Preserve your family's stories in their own voice.",
  keywords: ["ký ức gia đình", "lưu giữ câu chuyện", "family stories", "oral history"],
  openGraph: {
    title: "kyuc° — Keep your family's stories alive",
    description: "Preserve your family's stories in their own voice",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
