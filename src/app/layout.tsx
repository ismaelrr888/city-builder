import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./ui/fonts";
import { Header } from "./ui/Header";

export const metadata: Metadata = {
  title: {
    template: "%s | City Builder",
    default: "City Builder",
  },
  description: "The official city builder dashboard.",
  metadataBase: new URL("https://city-builder.vercel.sh"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header className="bg-gray-100 p-4 border border-gray-300">
          <Header.Root>
            <Header.Content className="text-red-700 font-semibold text-xl">
              City Builder
            </Header.Content>
          </Header.Root>
        </Header>
        {children}
      </body>
    </html>
  );
}
