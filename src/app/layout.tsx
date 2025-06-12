import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";


export const metadata: Metadata = {
  title: "TodoList",
  description: "Planning your schedule",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Providers>{children} </Providers>
      </body>
    </html>
  );
}
