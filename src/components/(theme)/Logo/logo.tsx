"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme]);

  return (
    <>
      {theme === "light" ? (
        <>
          <Image
            className={`${className ? className : "w-24"} mx-auto`}
            src={`/images/logo_paishita.png`}
            width={200}
            height={200}
            alt="logo paishita"
          />
        </>
      ) : theme === "dark" ? (
        <>
          <Image
            className={`${className ? className : "w-24"} mx-auto`}
            src={`/images/logo_paishita_dark.png`}
            width={200}
            height={200}
            alt="logo paishita"
          />
        </>
      ) : isDark ? (
        <>
          <Image
            className={`${className ? className : "w-24"} mx-auto`}
            src={`/images/logo_paishita_dark.png`}
            width={200}
            height={200}
            alt="logo paishita"
          />
        </>
      ) : (
        <>
          <Image
            className={`${className ? className : "w-24"} mx-auto`}
            src={`/images/logo_paishita.png`}
            width={200}
            height={200}
            alt="logo paishita"
          />
        </>
      )}
    </>
  );
};

export default Logo;
