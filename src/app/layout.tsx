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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${epilogue.variable} ${redRose.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
