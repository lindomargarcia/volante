import { z } from "@/lib/pt-zod"
import { validateCPF } from "@/lib/utils"

const customerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3).max(2024).toLowerCase(),
  cpf: z.string().refine((value) => validateCPF(value), {message: 'CPF inválido'}).or(z.literal('')),
  phone: z.string().min(12, {message: "Telefone inválido"}).max(15).or(z.literal('')),
  email: z.string().toLowerCase().email().or(z.literal('')),
}).superRefine(({ email, phone }, refinementContext) => {
    if (email === '' && phone === '' ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Forneça uma forma de contactar o cliente",
        path: ['email'],
      });
    }
  });

const DEFAULT_CUSTOMER_VALUE = {
    name: "",
    cpf: "",
    phone: "",
    email: ""
}
  
type CustomerSchema = z.infer<typeof customerSchema>

export { customerSchema, DEFAULT_CUSTOMER_VALUE }
export type { CustomerSchema }