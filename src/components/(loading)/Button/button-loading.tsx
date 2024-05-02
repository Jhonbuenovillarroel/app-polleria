import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

const ButtonLoading = () => {
  return (
    <Button disabled className="flex items-center gap-2 text-sm">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>Cargando...</span>
    </Button>
  );
};

export default ButtonLoading;
