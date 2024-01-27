import { Button } from "@/components/ui/button"
import {Sheet,SheetContent,SheetDescription,SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { User } from "@icon-park/react"
import { ReactComponentElement, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../ui/form"
import { FormInput } from "../FormInput"
import { CustomerSheetSchema, customerSheetSchema, defaultCustomerValues } from "./schema"

interface ICustomerSheetsProps {
  trigger: ReactComponentElement<any>
}

export function CustomerSheet({trigger}: ICustomerSheetsProps) {
  const form = useForm<CustomerSheetSchema>({resolver: zodResolver(customerSheetSchema), defaultValues: defaultCustomerValues})
  const [isOpen, setIsOpen] = useState(false)

  const onFormSubmit = (data: CustomerSheetSchema) => {
    console.log(data)
    setIsOpen(false)
  }

  const handleOnClean = (e: any) => {
    e.preventDefault()
    form.reset()
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex-1" onClick={() => setIsOpen(true)}>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex"><User className="p-1"/>Cliente</SheetTitle>
          <SheetDescription>
            Adicione aqui os dados do solicitante do orçamento. Clique em 'salvar' quando finalizar.
          </SheetDescription>
        </SheetHeader>

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
      </SheetContent>
    </Sheet>
  )
}
