
import { z } from "@/lib/pt-zod"

const defaultVehicleValues = {
    plate: "",
    brand: "",
    model: "",
    year: "",
    color: ""
}

const vehicleSchema = z.object({
    plate: z.string().length(7).toUpperCase(),
    brand: z.string().min(1, {message: 'Campo obrigatório'}),
    model: z.string().min(1, {message: 'Campo obrigatório'}),
    year: z.string().or(z.literal("")),
    color: z.string().toLowerCase()
  })
  
type VehicleSchema = z.infer<typeof vehicleSchema>

export { vehicleSchema, defaultVehicleValues }
export type { VehicleSchema }