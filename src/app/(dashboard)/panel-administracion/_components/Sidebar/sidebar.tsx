"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Home,
  LayoutDashboard,
  Package,
  Plus,
  Power,
  Truck,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import Logo from "@/components/(theme)/Logo/logo";
import ToggleThemeButton from "@/components/(theme)/ToggleThemeButton/toggle-theme-button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SideBar = () => {
  const pathname = usePathname();
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="fixed lg:relative z-10">
      <aside
        className={`fixed lg:sticky ${
          showSideBar ? "w-64" : "w-0 md:w-12"
        } pt-6 pb-8 top-0 bottom-0 z-[20] bg-zinc-100 dark:bg-zinc-950 overflow-scroll flex flex-col flex-none ${
          styles["sidebar-container"]
        } gap-3 ${
          showSideBar
            ? `${styles["show-scrollbar"]}`
            : `${styles["hide-scrollbar"]}`
        } transition-all duration-700`}
      >
        <div
          className={`w-full flex items-center justify-center ${
            showSideBar ? "opacity-100 w-full" : "opacity-0 w-0"
          } text-nowrap`}
        >
          <Link href={"/"} className="flex text-sm gap-1.5 items-center">
            <ChevronLeft className="w-4 h-4" />
            <p>Volver al Home</p>
          </Link>
        </div>
        <div
          className={`pt-1 flex flex-col gap-3 items-center justify-center text-sm ${
            showSideBar ? "opacity-100 w-full" : "opacity-0 w-0"
          } transition-all duration-700`}
        >
          <div
            className={` font-medium select-none rounded-full h-16 w-16 flex flex-col items-center justify-center`}
          >
            <Logo />
          </div>
        </div>

        <nav className="pt-4 text-sm font-medium text-nowrap">
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
                <Home className="w-4 h-4 min-h-4 min-w-4" strokeWidth={1.5} />
                <span>Principal</span>
              </Link>
            </li>
            <Accordion type="single" collapsible disabled={!showSideBar}>
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
              <li>
                <AccordionItem value="item-03" className="border-none">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3">
                    <div className="flex gap-4 items-center">
                      <Truck className="w-4 h-4" strokeWidth={1.5} />
                      <span>Ordenes</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    <Link
                      href={`/panel-administracion/ordenes/all`}
                      className={`flex items-center gap-2 px-12 hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3 transition-all duration-200 ${
                        pathname === "/panel-administracion/ordenes/all"
                          ? "bg-zinc-300 dark:bg-zinc-900"
                          : ""
                      }`}
                    >
                      <Eye className="w-4 h-4" strokeWidth={1.5} />
                      <span>Ver todos</span>
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </li>
              <li>
                <AccordionItem value="item-04" className="border-none">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3">
                    <div className="flex gap-4 items-center">
                      <User className="w-4 h-4" strokeWidth={1.5} />
                      <span>Usuarios</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    <Link
                      href={`/panel-administracion/usuarios/all`}
                      className={`flex items-center gap-2 px-12 hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3 transition-all duration-200 ${
                        pathname === "/panel-administracion/usuarios/all"
                          ? "bg-zinc-300 dark:bg-zinc-900"
                          : ""
                      }`}
                    >
                      <Eye className="w-4 h-4" strokeWidth={1.5} />
                      <span>Ver todos</span>
                    </Link>
                    <Link
                      href={`/panel-administracion/usuarios/new`}
                      className={`flex items-center gap-2 px-12 hover:bg-zinc-200 dark:hover:bg-zinc-900 py-3 transition-all duration-200 ${
                        pathname === "/panel-administracion/usuarios/new"
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
            <li className="flex items-center justify-center mt-8">
              <Button
                variant={"outline"}
                className="flex items-center gap-2 text-nowrap"
                onClick={() => signOut()}
              >
                <Power className="w-3.5 h-3.5" strokeWidth={1.5} />
                {showSideBar ? <span>Cerrar Sesión</span> : <></>}
              </Button>
            </li>
            <li className="flex items-center justify-center mt-4">
              <ToggleThemeButton />
            </li>
          </ul>
        </nav>
      </aside>

      <div className="">
        {showSideBar ? (
          <div
            className={`fixed z-[20] top-0 left-[256px] w-9 h-9 cursor-pointer bg-orange-500 rounded-r-md flex items-center justify-center transition-all duration-700`}
            onClick={() => setShowSideBar(false)}
          >
            <ChevronLeft strokeWidth={1.5} className="text-white w-6 h-6" />
          </div>
        ) : (
          <div
            className={`fixed z-[20] top-0 left-0 md:left-12 w-9 h-9 cursor-pointer bg-orange-500 rounded-r-md flex items-center justify-center transition-all duration-700`}
            onClick={() => setShowSideBar(true)}
          >
            <ChevronRight strokeWidth={1.5} className="text-white w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
