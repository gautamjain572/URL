import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "URL Shrotner",
  description: "Created by Me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
