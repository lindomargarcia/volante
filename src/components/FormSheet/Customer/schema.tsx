import { z } from "@/lib/pt-zod"
import { validateCPF } from "@/lib/utils"

const customerSchema = z.object({
    name: z.string().min(3).max(2024),
    cpf: z.string().refine((value) => validateCPF(value), {message: 'CPF inválido'}).or(z.literal('')),
    phone: z.string().min(12, {message: "Telefone inválido"}).max(15).or(z.literal('')),
    email: z.string().email().or(z.literal('')),
}).superRefine(({ email, phone }, refinementContext) => {
    if (email === '' && phone === '' ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Forneça pelo menos uma forma de contactar o cliente",
        path: ['email'],
      });
    }
  });

const defaultCustomerValues = {
    name: "",
    cpf: "",
    phone: "",
    email: ""
}
  
type CustomerSchema = z.infer<typeof customerSchema>

export { customerSchema, defaultCustomerValues }
export type { CustomerSchema }