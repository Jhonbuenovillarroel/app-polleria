import type { Metadata } from "next";
import "../../globals.css";
import Sidebar from "./_components/Sidebar/sidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Polleria el Paishita",
  description:
    "Somos una pollería en la ciudad de Jauja, ofrecemos un buen ambiente, además de una variedad de platos, entre ellos, pollo broaster, pollo a la brasa, chifa, etc, ven y vive la experiencia, te esperamos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full min-h-screen flex px-6 md:pl-16">{children}</div>
    </div>
  );
}
