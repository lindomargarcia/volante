import { Button } from "@/components/ui/button"
import { SheetFooter } from "@/components/ui/sheet"
import { User } from "@icon-park/react"
import { ReactComponentElement, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../ui/form"
import { FormInput } from "../FormInput"
import { CustomerSheetSchema, customerSheetSchema, defaultCustomerValues } from "./schema"
import { SheetContainer } from "../SheetContainer/SheetContainer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { putServiceOrderCustomerAPI } from "@/data/ServiceOrder"
import { ServiceOrder } from "@/features/ServiceOrder/types"

interface ICustomerSheetsProps {
  trigger: ReactComponentElement<any>,
  customer?: CustomerSheetSchema
}

export function CustomerSheet({trigger, customer}: ICustomerSheetsProps) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<CustomerSheetSchema>({
    resolver: zodResolver(customerSheetSchema),
    defaultValues: defaultCustomerValues
  })

  useEffect(() => {
    if(!isOpen) return
    form.clearErrors()
    form.setValue('name', customer?.name || '')
    form.setValue('cpf', customer?.cpf  || '')
    form.setValue('phone', customer?.phone  || '')
    form.setValue('email', customer?.email || '')
  }, [customer, isOpen])


  const { mutateAsync: putServiceOrderCustomerFn, isPending } = useMutation({
    mutationFn: putServiceOrderCustomerAPI,
    onSuccess(__, variables) {
      queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
        const newSO = {...data}
        newSO.customer = variables
        setIsOpen(false)
        return newSO
      })
    },
  })

  const onFormSubmit = (data: CustomerSheetSchema) => {
    putServiceOrderCustomerFn(data)
  }

  const handleOnClean = (e: any) => {
    e.preventDefault()
    form.reset()
  }

  return (
    <SheetContainer
      title="Cliente"
      isOpen={isOpen}
      onIsOpenChange={setIsOpen}
      description="Adicione aqui os dados do solicitante do orçamento. Clique em 'salvar' quando finalizar."
      icon={<User className="p-1"/>}
      trigger={trigger}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4 py-4">
            <FormInput name="name" label="Nome" type="text" placeholder="Digite aqui..." form={form} direction={"col"}/>
            <FormInput name="cpf" label="CPF" type="text" placeholder="000.000.000-00" form={form}/>
            <FormInput name="phone" label="Telefone" type="phone"  placeholder="(00) 00000-0000" form={form}/>
            <FormInput name="email" label="E-mail" type="email" placeholder="funilaria@contato.com" form={form}/>

            <SheetFooter>
              <Button type="submit" disabled={isPending}>Salvar</Button>
              <Button variant={"outline"} disabled={isPending} onClick={handleOnClean}>Limpar</Button>
            </SheetFooter>
          </form>
        </Form>
    </SheetContainer>
  )
}
