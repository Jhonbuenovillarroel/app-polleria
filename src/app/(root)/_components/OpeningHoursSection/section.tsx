import { CalendarClock, Clock } from "lucide-react";
import React from "react";

const OpeningHoursSection = () => {
  return (
    <section className="relative bg-zinc-900 h-[300px] text-zinc-100 flex flex-col items-center justify-center gap-5 bg-[url('/images/menu/dishes.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.65)]">
      <div className="flex flex-col gap-5 items-center relative z-[1]">
        <h3 className="text-2xl font-semibold">Horario de Atención</h3>
        <p className="text-lg font-medium flex items-center gap-2">
          <CalendarClock className="w-4 h-4" />
          <span>Lunes a Domingo</span>
        </p>
        <p className="text-zinc-300 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>9:00 am 9:00 pm</span>
        </p>
      </div>
    </section>
  );
};

export default OpeningHoursSection;
