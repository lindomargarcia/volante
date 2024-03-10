import { Button } from "@/components/ui/button"
import { SheetFooter } from "@/components/ui/sheet"
import { User } from "lucide-react"
import { ReactComponentElement, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../ui/form"
import { FormInputNew } from "../../FormInput"
import { CustomerSchema, customerSchema, defaultCustomerValues } from "./schema"
import { SheetContainer } from "../../SheetContainer/SheetContainer"
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton"
import MaskedInput from "@/components/MaskedInput/MaskedInput"
import { MASKS } from "@/lib/utils"
import { Input } from "@/components/ui/input"
interface ICustomerSheetsProps {
  trigger: ReactComponentElement<any>,
  data?: CustomerSchema,
  onSubmit: (data: CustomerSchema) => Promise<any>
  onDelete: (data?: CustomerSchema) => Promise<any>
  isPending: boolean
}

export function CustomerFormSheet({trigger, data, onSubmit, onDelete, isPending}: ICustomerSheetsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: defaultCustomerValues
  })

  useEffect(() => {
    if(!isOpen) return
    form.clearErrors()
    form.setValue('name', data?.name || '')
    form.setValue('cpf', data?.cpf  || '')
    form.setValue('phone', data?.phone  || '')
    form.setValue('email', data?.email || '')
  }, [data, isOpen])


  const onFormSubmit = (data: CustomerSchema) => {
    console.log(data)
    onSubmit(data).then(() => {
      setIsOpen(false)
    })
  }

  const handleOnDelete = (data: CustomerSchema) => {
    onDelete(data).then(() => {
      setIsOpen(false)
    })
  }

  return (
    <SheetContainer
      title="Cliente"
      isOpen={isOpen}
      onIsOpenChange={setIsOpen}
      description="Adicione aqui os dados do solicitante do orçamento. Clique em 'salvar' quando finalizar."
      icon={<User size={30} className="p-1"/>}
      trigger={trigger}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4 py-4">
            <FormInputNew name='name' label="Nome" form={form}>
              {(field) => <Input type="text" placeholder="Digite aqui..." {...field}/>}
            </FormInputNew>
            <FormInputNew name="cpf" label='CPF' form={form}>
              {(field) => <MaskedInput mask={MASKS.CPF} placeholder='000.000.000-00' {...field}/>}
            </FormInputNew>
            <FormInputNew name="phone" label='Telefone' form={form}>
              {(field) => <MaskedInput mask={MASKS.PHONE} maskChar="" placeholder='(00) 00000-0000' {...field}/>}
            </FormInputNew>
            <FormInputNew name="email" label="E-mail" form={form}>
              {(field) => <Input type="email" placeholder="Digite aqui..." {...field}/>}
            </FormInputNew>

            <SheetFooter className="mt-4 justify-between">
              <Button type="submit" disabled={isPending}>Salvar</Button>
              {data?.name && <ConfirmButton 
                  onConfirm={() => handleOnDelete(data)}
                  variant={"destructive"}
                  disabled={isPending}
                  title="Remover cliente"
                  message="Deseja realmente remover o cliente desse orçamento?">
                    Remover
                </ConfirmButton>}
            </SheetFooter>
          </form>
        </Form>
    </SheetContainer>
  )
}
