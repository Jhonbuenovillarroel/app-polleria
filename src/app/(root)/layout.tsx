import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header/header";

export const metadata: Metadata = {
  title: "Polleria el Paishita",
  description:
    "Somos una pollería en la ciudad de Jauja, ofrecemos un buen ambiente, además de una variedad de platos, entre ellos, pollo broaster, pollo a la brasa, chifa, etc, ven y vive la experiencia, te esperamos",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
