import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/fonts/fonts";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/(providers)/ThemeProvider/provider";

export const metadata: Metadata = {
  title: "Polleria el Paishita",
  description:
    "Somos una pollería en la ciudad de Jauja, ofrecemos un buen ambiente, además de una variedad de platos, entre ellos, pollo broaster, pollo a la brasa, chifa, etc, ven y vive la experiencia, te esperamos",
  icons: {
    icon: "/images/logo_paishita_dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-zinc-100 dark:bg-zinc-950`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
