"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  tipo_bien: z.string().optional(),
  marca: z.string().min(1, "La marca es requerida"),
  modelo: z.string().min(1, "El modelo es requerido"),
  anio: z.string().min(4, "El año debe tener 4 dígitos"),
  patente: z.string().optional(),
  cobertura: z.string().min(1, "La cobertura es requerida"),
  monto: z.string().min(1, "El monto es requerido"),
  adicionales: z.string().default("0"),
  accesorios: z.string().default("0"),
})

export function CreateAssetForm({ onSubmit, onCancel }: { 
  onSubmit: (values: z.infer<typeof formSchema>) => void
  onCancel: () => void 
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adicionales: "0",
      accesorios: "0",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tipo_bien"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Bien</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de bien" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="4-AUTOS">Autos</SelectItem>
                  <SelectItem value="MOTO">Motos</SelectItem>
                  <SelectItem value="CASA">Casa</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la cobertura" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="D3">D3</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                </SelectContent>
              </Select>
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
          <Button type="submit">Guardar Bien</Button>
        </div>
      </form>
    </Form>
  )
}

