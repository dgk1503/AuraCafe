import { title } from "process";
import LenisProvider from "./components/LenisProvider";
import "./globals.css";
import { Icon, icons } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className="">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
export const metadata = {
  title: "OpenCafe",
  icons: {
    icon: "./favicon_1.png",
  },
  description: "Demo cafe website !",
};
