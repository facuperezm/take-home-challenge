import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Storied Take Home Assignment",
  description: "Storied Take Home Assignment created by Facundo Perez Montalvo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-100">{children}</body>
    </html>
  );
}
