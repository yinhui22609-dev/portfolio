import type { Metadata } from "next";
import { assetPath } from "@/lib/asset-path";
import "./globals.css";

export const metadata: Metadata = {
  title: "PORTFOLIO — 产品设计作品集",
  description: "五个关于日常、文化与数字体验的设计探索。产品设计、UI 设计与数字体验作品集。",
  icons: { icon: { url: assetPath("/favicon.svg"), type: "image/svg+xml" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
