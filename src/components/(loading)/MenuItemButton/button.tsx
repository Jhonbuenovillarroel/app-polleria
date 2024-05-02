import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

const MenuItemButtonLoading = () => {
  return (
    <Button
      disabled
      variant={"orangeButton"}
      className="flex items-center gap-2"
    >
      <Loader2 className="w-4 h-4 animate-spin" />
      <p>Agregando...</p>
    </Button>
  );
};

export default MenuItemButtonLoading;
