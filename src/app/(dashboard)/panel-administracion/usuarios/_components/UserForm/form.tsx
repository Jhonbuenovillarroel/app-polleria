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
import axios from "axios";
import toast from "react-hot-toast";
import ButtonLoading from "@/components/(loading)/Button/button-loading";
import { useRouter } from "next/navigation";
import { user } from "@prisma/client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  mode: "edit" | "create";
  user?: user | null;
}

const formSchema = z.object({
  name: z
    .string({ required_error: "Campo Obligatorio" })
    .min(1, { message: "Debe tener al menos 1 caracter" }),
  username: z
    .string({ required_error: "Campo Obligaotrio" })
    .min(1, { message: "Debe tener al menos 1 caracter" }),
  email: z
    .string({ required_error: "Campo Obligatorio" })
    .email({ message: "Email no válido" }),
  role: z
    .string({ required_error: "Campo Obligatorio" })
    .min(1, { message: "Este campo es Obligatorio" }),
  password: z
    .string({ required_error: "Campo Obligatorio" })
    .min(1, { message: "Debe tener al menos 9 caracteres" }),
});

const UserForm = ({ mode, user }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ? user.name : "",
      username: user?.username ? `${user.username}` : "",
      email: user?.email ? user.email : "",
      password: mode === "create" ? "" : "*",
      role: user?.role ? user.role : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);

    try {
      const { data } = await axios.post(
        mode === "create"
          ? "/api/users/api/register-user"
          : "/api/users/api/edit",
        mode === "create" ? values : { ...values, id: user?.id }
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
    <div className="w-full max-w-[320px] mx-auto py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-sm"
        >
          <h2 className="font-medium text-xl">Crea un nuevo producto</h2>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="ej. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de Usuario</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="john123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="ejemplo@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === "create" && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*********************"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="colaborator">Colaborador</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
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

export default UserForm;
