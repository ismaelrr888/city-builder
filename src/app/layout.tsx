import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./ui/fonts";
import { Header } from "./ui/Header";
import WeatherComponent from "./components/weather/Weather";

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
        <Header className="bg-gray-100 p-4 border border-gray-300 flex justify-between items-center">
          <p className="font-semibold text-red-500 text-2xl">City Builder</p>
          <WeatherComponent />
        </Header>
        {children}
      </body>
    </html>
  );
}
