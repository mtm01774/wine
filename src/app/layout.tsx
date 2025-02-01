import type { Metadata } from "next";
import { Epilogue, Red_Rose } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-epilogue'
});

const redRose = Red_Rose({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-redrose'
});

export const metadata: Metadata = {
  title: "Wine Store - Sua experiência premium em vinhos",
  description: "Descubra o prazer de receber os melhores vinhos em casa com nossa curadoria especializada",
  icons: {
    icon: '/favicon.ico',
  },
  viewport: 'width=device-width, initial-scale=1',
  charSet: 'utf-8',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${epilogue.variable} ${redRose.variable} font-sans antialiased bg-[#1A393E] text-[#ECE5D5] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
