import "./globals.css";
import type { Metadata } from "next";
import Providers from "./lib/Provider";
export const metadata: Metadata = {
  title: "EWN task",
  description: "Generated by Md Rifat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
