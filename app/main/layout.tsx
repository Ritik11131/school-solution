import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Providers } from "../providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
  );
}
