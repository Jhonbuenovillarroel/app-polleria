import type { Metadata } from "next";
import "../../globals.css";
import Header from "@/components/Header/header";

export const metadata: Metadata = {
  title: "Polleria el Paishita",
  description:
    "Somos una pollería en la ciudad de Jauja, ofrecemos un buen ambiente, además de una variedad de platos, entre ellos, pollo broaster, pollo a la brasa, chifa, etc, ven y vive la experiencia, te esperamos",
};

export default function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex">
      {sidebar}
      {children}
    </div>
  );
}
