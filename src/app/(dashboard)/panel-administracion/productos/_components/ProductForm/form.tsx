"use client";

import React, { useId, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonLoading from "@/components/(loading)/Button/button-loading";
import ReactSelect from "react-select";
import "@/app/styles/react-select.css";
import { product, productCategory } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  categories: productCategory[];
  mode: "edit" | "create";
  product?: (product & { categories: productCategory[] }) | null;
}

const formSchema = z.object({
  name: z
    .string({ required_error: "Campo Obligatorio" })
    .min(1, { message: "Debe tener al menos 1 caracter" }),
  price: z
    .string({ required_error: "Campo Obligaotrio" })
    .min(1, { message: "Debe ser de al menos 0.1" }),
  categories: z
    .array(
      z.object({
        value: z.string({ required_error: "Campo Obligatorio" }),
        id: z.string({ required_error: "Campo Obligatorio" }),
      })
    )
    .nonempty({
      message: "Debes elegir al menos 1 categoría para este producto",
    }),
  description: z.string().optional(),
});

const ProductForm = ({ categories, mode, product }: Props) => {
  const router = useRouter();
  const reactSelectId = useId();
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name ? product.name : "",
      price: product?.price ? `${product.price}` : "",
      description: product?.description ? product.description : "",
      categories: product?.categories.length
        ? product.categories.map((categorie) => ({
            value: categorie.name,
            id: categorie.id,
          }))
        : [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);

    try {
      const { data } = await axios.post(
        mode === "create"
          ? "/api/products/api/create"
          : "/api/products/api/edit",
        mode === "create" ? values : { ...values, id: product?.id }
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
      setFormLoading(false);
      if (mode === "create") {
        form.reset();
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-[500px] mx-auto py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="font-medium text-xl">Crea un nuevo producto</h2>
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="ej. Pollo broaster 1/4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ej. 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <ReactSelect
                      instanceId={reactSelectId}
                      value={field.value.map((categorie) => {
                        return {
                          value: categorie.value,
                          label: categorie.value,
                        };
                      })}
                      onChange={(values) => {
                        const data = values as {
                          value: string;
                          label: string;
                        }[];

                        field.onChange(
                          values.map((value) => {
                            for (let categorie of categories) {
                              if (categorie.name === value.value) {
                                return {
                                  id: categorie.id,
                                  value: categorie.name,
                                };
                              }
                            }
                          })
                        );
                      }}
                      isMulti
                      className="react-select-container"
                      classNamePrefix="react-select"
                      options={categories.map((categorie) => {
                        return {
                          value: categorie.name,
                          label: categorie.name,
                        };
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ej. Hecho con una receta propia que nos tomó años desarrollar y a base de productos naturales"
                      {...field}
                    />
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

export default ProductForm;
