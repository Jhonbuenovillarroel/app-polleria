import Logo from "@/components/(theme)/Logo/logo";
import React from "react";

const Page = () => {
  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full flex flex-col gap-1 items-center justify-center">
        <Logo />
        <p className="text-xl font-medium">Pollería El Paishita</p>
      </section>
    </main>
  );
};

export default Page;
