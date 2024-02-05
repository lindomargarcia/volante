import { z } from "@/lib/pt-zod"

const customerSheetSchema = z.object({
    name: z.string().min(3).max(2024),
    cpf: z.string().min(9).max(11).or(z.literal('')),
    phone: z.string().min(8).max(12).or(z.literal('')),
    email: z.string().email().or(z.literal('')),
})

const defaultCustomerValues = {
    name: "",
    cpf: "",
    phone: "",
    email: ""
}
  
type CustomerSheetSchema = z.infer<typeof customerSheetSchema>

export { customerSheetSchema, defaultCustomerValues }
export type { CustomerSheetSchema }