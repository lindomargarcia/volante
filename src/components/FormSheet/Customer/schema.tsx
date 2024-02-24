import { z } from "@/lib/pt-zod"

const customerSchema = z.object({
    name: z.string().min(3).max(2024),
    cpf: z.string().min(9).max(11).or(z.literal('')),
    phone: z.string().min(8).max(12),
    email: z.string().email().or(z.literal('')),
})

const defaultCustomerValues = {
    name: "",
    cpf: "",
    phone: "",
    email: ""
}
  
type CustomerSchema = z.infer<typeof customerSchema>

export { customerSchema, defaultCustomerValues }
export type { CustomerSchema }