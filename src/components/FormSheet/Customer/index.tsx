import { Button } from "@/components/ui/button"
import { SheetFooter } from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../ui/form"
import { FormInput } from "../../FormInput"
import { CustomerSchema, customerSchema, DEFAULT_CUSTOMER_VALUE } from "./schema"
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton"
import MaskedInput from "@/components/MaskedInput/MaskedInput"
import { MASKS } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
interface ICustomerSheetsProps {
  data?: CustomerSchema,
  onSubmit: (data: CustomerSchema) => Promise<any>
  onDelete: (data?: CustomerSchema) => Promise<any>
  isPending: boolean
}

export function CustomerForm({data, onSubmit, onDelete, isPending}: ICustomerSheetsProps) {
  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: data || DEFAULT_CUSTOMER_VALUE
  })

  useEffect(() => {
    console.log(data)
  }, [JSON.stringify(data)])
  const handleOnSubmit = (data: CustomerSchema) => {onSubmit(data)}

  const handleOnDelete = () => {
    form.clearErrors()
    form.setValue('name','')
    form.setValue('cpf','')
    form.setValue('phone','')
    form.setValue('email','')
    onDelete()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className={'grid gap-2 py-4'}>
        <FormInput name='name' label="Nome" form={form}>
          {(field) => <Input type="text" placeholder="Digite aqui..." {...field}/>}
        </FormInput>
        <div className="flex gap-2">
          <FormInput name="cpf" className="flex-1" label='CPF' form={form}>
            {(field) => <MaskedInput mask={MASKS.CPF} placeholder='000.000.000-00' {...field}/>}
          </FormInput>
          <FormInput name="phone" className="flex-1" label='Telefone' form={form}>
            {(field) => <MaskedInput mask={MASKS.PHONE} maskChar="" placeholder='(00) 00000-0000' {...field}/>}
          </FormInput>
        </div>
        <FormInput name="email" label="E-mail" form={form}>
          {(field) => <Input type="email" placeholder="Digite aqui..." {...field}/>}
        </FormInput>
        <SheetFooter className="mt-4 justify-between">
          {!(data?.id) && <Button type="submit" disabled={isPending}>Salvar</Button>}
          {data?.name && <ConfirmButton 
              onConfirm={() => handleOnDelete()}
              variant={"destructive"}
              disabled={isPending}
              title="Remover cliente"
              message="Deseja realmente remover o cliente desse orçamento?">
                Remover
            </ConfirmButton>}
        </SheetFooter>
      </form>
    </Form>
  )
}
