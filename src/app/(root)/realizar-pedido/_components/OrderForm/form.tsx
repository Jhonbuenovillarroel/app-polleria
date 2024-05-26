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
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import styles from "./form.module.css";
import { E164Number } from "libphonenumber-js/core";
import axios from "axios";
import { useShoppingCartStore } from "@/store/shopping-cart-store";
import Logo from "@/components/(theme)/Logo/logo";
import { generateSweetAlertPopup } from "@/lib/utils";
import ButtonLoading from "@/components/(loading)/Button/button-loading";
import { useRouter } from "next/navigation";
import { format, setHours } from "date-fns";

const formSchema = z.object({
  name: z
    .string({ required_error: "Campo Obligatorio" })
    .min(1, { message: "Debe tener al menos 1 caracter" }),
  cellPhone: z
    .string({ required_error: "Campo Obligatorio" })
    .min(1, { message: "Debes rellenar este campo" }),
  address: z
    .string({ required_error: "Campo Obligatorio" })
    .min(1, { message: "Debe tener al menos 1 caracter" }),
});

const OrderForm = () => {
  const router = useRouter();
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cellPhone: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);
    const currentTime = new Date();
    const orderOpening = new Date(
      format(setHours(new Date(), 11), "yyyy-MM-dd HH:mm:ss")
    );
    const orderClosing = new Date(
      format(setHours(new Date(), 22), "yyyy-MM-dd HH:mm:ss")
    );

    if (currentTime < orderOpening || currentTime > orderClosing) {
      generateSweetAlertPopup({
        icon: "error",
        title: "Fuera de horario de atención",
        subtitle:
          "Estás intentando hacer un pedido fuera del horario de atención, nuestro horario de atención es de 11:00 AM a 10:00 PM",
        confirmButtonText: "Entiendo",
      });
      setFormLoading(false);
      return;
    }

    // generateSweetAlertPopup({
    //   title: "Delivery pausado",
    //   subtitle:
    //     "Hemos tenido unas semanas muy pesadas últimamente, y hemos decidido pausar la entrega de pedidos a domicilio por el momento, pronto reorganizaremos todo para que puedas realizar tus pedidos por la web",
    //   confirmButtonText: "Entiendo",
    // });

    try {
      const { data } = await axios.post("/api/orders/api/create", {
        customerData: values,
        products: shoppingCartStore.products,
      });

      if (data.ok) {
        generateSweetAlertPopup({
          icon: "success",
          title: data.message,
          subtitle:
            "La orden se creó y envió al negocio, tu pedido llegará a tu casa dentro 30 - 60 minutos, gracias por elegirnos",
          confirmButtonText: "Genial",
        });
        shoppingCartStore.setProducts([]);
      }
    } catch (error) {
      generateSweetAlertPopup({
        icon: "error",
        title: "Algo salió mal",
        subtitle: "Vuelve a intentarlo o inténtalo más tarde",
      });
    }

    setTimeout(() => {
      form.reset();
      setFormLoading(false);
    }, 1000);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <p className="w-full max-w-[320px] flex text-sm text-zinc-500 dark:text-zinc-400">
        Nota: Por el momento no tenemos una pasarela de pagos, así que puedes
        realizar un pedido simplemente rellenando este formulario, y el pago es
        a contraentrega
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border px-6 pt-6 pb-8 border-zinc-200 dark:border-zinc-800 w-full max-w-[320px] flex flex-col items-center justify-center"
        >
          <Logo />

          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre y Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cellPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de celular</FormLabel>
                  <FormControl>
                    <PhoneInput
                      value={field.value as E164Number}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultCountry="PE"
                      className={`${styles["phone-input-container"]} w-full ring-1 ring-zinc-200 dark:ring-zinc-800 focus-within:ring-offset-zinc-800 focus-within:ring-offset-2 focus-within:rounded-md dark:focus-within:ring-offset-zinc-200 text-sm`}
                      placeholder="999 999 999"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Jr. Manco Capac 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {formLoading ? (
            <ButtonLoading />
          ) : (
            <Button variant={"orangeButton"}>Realizar Pedido</Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
