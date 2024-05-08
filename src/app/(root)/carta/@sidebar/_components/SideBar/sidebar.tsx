"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./sidebar.module.css";
import CategoryFilters from "../CategoryFilters/category-filters";
import { productCategory } from "@prisma/client";
import Logo from "@/components/(theme)/Logo/logo";

interface Props {
  categories: productCategory[];
  categorySearchParameter: string | undefined;
}

const SideBar = ({ categories, categorySearchParameter }: Props) => {
  const pathname = usePathname();
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="fixed lg:relative z-10">
      <aside
        className={`fixed lg:sticky mt-[64px] lg:mt-0 ${
          showSideBar ? "w-64" : "w-0"
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

        <div className="px-4 mt-4">
          <h3
            className={`text-sm text-nowrap ${
              showSideBar ? "opacity-100" : "opacity-0"
            } transition-all duration-500`}
          >
            Filtrar por:
          </h3>

          <CategoryFilters
            categories={categories}
            categorySearchParameter={categorySearchParameter}
          />
        </div>
      </aside>

      <div className="">
        {showSideBar ? (
          <div
            className={`fixed z-[20] mt-[64px] top-0 left-[256px] w-9 h-9 cursor-pointer bg-orange-500 rounded-r-md flex items-center justify-center transition-all duration-700`}
            onClick={() => setShowSideBar(false)}
          >
            <ChevronLeft strokeWidth={1.5} className="text-white w-6 h-6" />
          </div>
        ) : (
          <div
            className={`fixed z-[20] mt-[64px] top-0 left-0 w-9 h-9 cursor-pointer bg-orange-500 rounded-r-md flex items-center justify-center transition-all duration-700`}
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
