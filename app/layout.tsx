import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="text-center text-2xl p-5 font-bold">
          เว็บไซต์ตรวจสอบใบจบการศึกษาภาควิชาวิทยาการคอมพิวเตอร์ <br />ณ มหาวิทยาลัยเกษตรศาสตร์ บางเขน
        </div>
        {children}
      </body>
    </html>
  );
}
