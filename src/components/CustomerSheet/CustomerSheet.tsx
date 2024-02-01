import { Button } from "@/components/ui/button"
import { SheetFooter } from "@/components/ui/sheet"
import { User } from "@icon-park/react"
import { ReactComponentElement } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../ui/form"
import { FormInput } from "../FormInput"
import { CustomerSheetSchema, customerSheetSchema, defaultCustomerValues } from "./schema"
import { SheetContainer } from "../SheetContainer/SheetContainer"

interface ICustomerSheetsProps {
  trigger: ReactComponentElement<any>
}

export function CustomerSheet({trigger}: ICustomerSheetsProps) {
  const form = useForm<CustomerSheetSchema>({resolver: zodResolver(customerSheetSchema), defaultValues: defaultCustomerValues})

  const onFormSubmit = (data: CustomerSheetSchema) => {
    console.log(data)
  }

  const handleOnClean = (e: any) => {
    e.preventDefault()
    form.reset()
  }

  return (
    <SheetContainer
      title="Cliente"
      description="Adicione aqui os dados do solicitante do orçamento. Clique em 'salvar' quando finalizar."
      icon={<User className="p-1"/>}
      trigger={trigger}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4 py-4">
            <FormInput name="name" label="Nome" type="text" placeholder="Digite aqui..." form={form}/>
            <FormInput name="cpf" label="CPF" type="text" placeholder="000.000.000-00" form={form}/>
            <FormInput name="phone" label="Telefone" type="phone"  placeholder="(00) 00000-0000" form={form}/>
            <FormInput name="email" label="E-mail" type="email" placeholder="funilaria@contato.com" form={form}/>

            <SheetFooter className="mt-4">
              <Button variant={"outline"} onClick={handleOnClean}>Limpar</Button>
              <Button type="submit">Salvar</Button>
            </SheetFooter>
          </form>
        </Form>
    </SheetContainer>
  )
}
