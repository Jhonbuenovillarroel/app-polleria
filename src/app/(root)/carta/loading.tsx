import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>Cargando...</span>
    </div>
  );
};

export default Loading;
