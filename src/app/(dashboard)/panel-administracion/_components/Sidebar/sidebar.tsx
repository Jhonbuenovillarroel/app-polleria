"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Eye, Home, LayoutDashboard, Package, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import ToggleThemeButton from "@/components/(theme)/ToggleThemeButton/toggle-theme-button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className=" inline-block w-64 shrink-0 bg-zinc-100 dark:bg-zinc-950 min-h-screen">
      <div></div>
      <nav className="pt-8 text-sm font-medium">
        <ul>
          <li>
            <Link
              href={`/panel-administracion`}
              className={`flex gap-4 items-center px-4 hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3 transition-all duration-200 ${
                pathname === "/panel-administracion"
                  ? "bg-zinc-300 dark:bg-zinc-900"
                  : ""
              }`}
            >
              <Home className="w-4 h-4" strokeWidth={1.5} />
              <span>Principal</span>
            </Link>
          </li>
          <Accordion type="single" collapsible>
            <li>
              <AccordionItem value="item-01" className="border-none">
                <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3">
                  <div className="flex gap-4 items-center">
                    <Package className="w-4 h-4" strokeWidth={1.5} />
                    <span>Productos</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <Link
                    href={`/panel-administracion/productos/all`}
                    className={`flex items-center gap-2 px-12 hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3 transition-all duration-200 ${
                      pathname === "/panel-administracion/productos/all"
                        ? "bg-zinc-300 dark:bg-zinc-900"
                        : ""
                    }`}
                  >
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                    <span>Ver todos</span>
                  </Link>
                  <Link
                    href={`/panel-administracion/productos/new`}
                    className={`flex items-center gap-2 px-12 hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3 transition-all duration-200 ${
                      pathname === "/panel-administracion/productos/new"
                        ? "bg-zinc-300 dark:bg-zinc-900"
                        : ""
                    }`}
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                    <span>Crear</span>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="item-02" className="border-none">
                <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3">
                  <div className="flex gap-4 items-center">
                    <LayoutDashboard className="w-4 h-4" strokeWidth={1.5} />
                    <span>Categorias</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <Link
                    href={`/panel-administracion/categorias/all`}
                    className={`flex items-center gap-2 px-12 hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3 transition-all duration-200 ${
                      pathname === "/panel-administracion/categorias/all"
                        ? "bg-zinc-300 dark:bg-zinc-900"
                        : ""
                    }`}
                  >
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                    <span>Ver todos</span>
                  </Link>
                  <Link
                    href={`/panel-administracion/categorias/new`}
                    className={`flex items-center gap-2 px-12 hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3 transition-all duration-200 ${
                      pathname === "/panel-administracion/categorias/new"
                        ? "bg-zinc-300 dark:bg-zinc-900"
                        : ""
                    }`}
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                    <span>Crear</span>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </li>
          </Accordion>
          <li className="flex items-center justify-center mt-9">
            <ToggleThemeButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
