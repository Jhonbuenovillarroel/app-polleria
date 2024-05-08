"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import ButtonLoading from "@/components/(loading)/Button/button-loading";
import { useRouter } from "next/navigation";
import { productCategory } from "@prisma/client";

interface Props {
  mode: "create" | "edit";
  category: productCategory | null;
}

const formSchema = z.object({
  name: z
    .string({ required_error: "Campo Obligatorio" })
    .min(1, { message: "Debe tener al menos 1 caracter" }),
});

const CategoryForm = ({ mode, category }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name ? category.name : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);

    try {
      const { data } = await axios.post(
        mode === "create"
          ? "/api/categories/api/create"
          : "/api/categories/api/edit",
        mode === "create" ? values : { ...values, id: category?.id }
      );

      if (data.ok) {
        toast.success(data.message);
        router.refresh();
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Algo salió mal, vuelve a intentarlo");
    }

    setTimeout(() => {
      form.reset();
      setFormLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-medium">Crea una nueva categoría</h2>
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. Snacks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {formLoading ? (
            <>
              <ButtonLoading />
            </>
          ) : (
            <>
              <Button type="submit">
                {mode === "create" ? "Crear" : "Editar"}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
