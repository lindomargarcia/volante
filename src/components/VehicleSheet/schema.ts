
import { z } from "@/lib/pt-zod"

const defaultVehicleValues = {
    plate: "",
    brand: "",
    model: "",
    year: 2024,
    color: ""
}

const vehicleSheetSchema = z.object({
    plate: z.string().length(7),
    brand: z.string(),
    model: z.string(),
    year: z.coerce.number().int().gte(1500).lte(2025),
    color: z.string().toLowerCase()
  })
  
type VehicleSheetSchema = z.infer<typeof vehicleSheetSchema>

export { vehicleSheetSchema, defaultVehicleValues }
export type { VehicleSheetSchema }