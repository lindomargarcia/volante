
import { z } from "@/lib/pt-zod"

const DEFAULT_VEHICLE_VALUES = {
    plate: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    fuel: "",
    km: "",
    chassi: ""
}

const vehicleSchema = z.object({
  id: z.string().optional(),
  plate: z.string().length(7, {message: 'Placa inválida'}).toUpperCase().or(z.literal("").nullable()),
  brand: z.string().min(1, {message: 'Campo obrigatório'}),
  model: z.string().min(1, {message: 'Campo obrigatório'}),
  year: z.string().or(z.literal("")),
  color: z.string().toLowerCase(),
  km: z.string().optional(),
  fuel: z.string().optional(),
  chassi: z.string().optional()
})
  
type VehicleSchema = z.infer<typeof vehicleSchema>

export { vehicleSchema, DEFAULT_VEHICLE_VALUES }
export type { VehicleSchema }