
import { z } from "@/lib/pt-zod"

const defaultVehicleValues = {
    plate: "",
    brand: "",
    model: "",
    year: "",
    color: ""
}

const vehicleSheetSchema = z.object({
    plate: z.string().length(7),
    brand: z.string().min(1, {message: 'Campo obrigatório'}),
    model: z.string().min(1, {message: 'Campo obrigatório'}),
    year: z.string().or(z.literal("")),
    color: z.string().toLowerCase()
  })
  
type VehicleSheetSchema = z.infer<typeof vehicleSheetSchema>

export { vehicleSheetSchema, defaultVehicleValues }
export type { VehicleSheetSchema }