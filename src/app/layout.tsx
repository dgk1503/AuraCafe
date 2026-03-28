import LenisProvider from "./components/LenisProvider";
import "./globals.css";

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
