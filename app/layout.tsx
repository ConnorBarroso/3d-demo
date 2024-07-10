import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Interview Showcase",
  description: "My skill showcase for Qlik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {" "}
        <div className=" flex items-center bg-white w-[100vw] h-[60px] absolute top-0">
          <Link href={"/"} className="text-gray-500 pl-[20px] font-bold">
            Connor Barroso Quik Showcase
          </Link>
          <Link
            href={"/about-me"}
            className="text-gray-500 pl-[20px] font-bold"
          >
            About Me
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
