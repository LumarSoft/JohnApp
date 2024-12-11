"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  id_bien: z.number(), // Change to number instead of string
  tipo_bien: z.string().default(""),
  marca: z.string().default(""),
  modelo: z.string().default(""),
  anio: z.string().default(""),
  patente: z.string().default(""),
  cobertura: z.string().default(""),
  monto: z.string().min(1, "El monto es requerido"),
  adicionales: z.string().default("0"),
  accesorios: z.string().default("0"),
});

export function EditAssetForm({
  bien,
  onSubmit,
  onCancel,
}: {
  bien: any;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_bien: bien.id_bien, // Ensure this is a number
      tipo_bien: bien.tipo_bien || "Auto",
      marca: bien.marca,
      modelo: bien.modelo,
      anio: bien.anio ? bien.anio.toString() : "",
      patente: bien.patente || "",
      cobertura: bien.cobertura,
      monto: bien.monto.toString(),
      adicionales: bien.adicionales.toString(),
      accesorios: bien.accesorios.toString(),
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tipo_bien"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Bien</FormLabel>
              <FormControl>
                <Input placeholder="Tipo de bien" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <input type="hidden" {...form.register("id_bien")} />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="marca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input placeholder="Marca" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="modelo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input placeholder="Modelo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="anio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Año</FormLabel>
                <FormControl>
                  <Input placeholder="Año" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="patente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patente</FormLabel>
                <FormControl>
                  <Input placeholder="Patente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="cobertura"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cobertura</FormLabel>

              <FormControl>
                <Input placeholder="Cobertura" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <Input placeholder="Monto" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="adicionales"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adicionales</FormLabel>
                <FormControl>
                  <Input placeholder="Adicionales" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accesorios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accesorios</FormLabel>
                <FormControl>
                  <Input placeholder="Accesorios" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Actualizar Bien</Button>
        </div>
      </form>
    </Form>
  );
}
