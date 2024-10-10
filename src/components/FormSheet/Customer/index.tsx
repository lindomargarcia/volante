import { useForm } from "react-hook-form"
import { Form } from "../../ui/form"
import { CustomerSchema, DEFAULT_CUSTOMER_VALUE } from "./schema"
import MaskedInput from "@/components/MaskedInput/MaskedInput"
import { MASKS } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface ICustomerSheetsProps {
  data: CustomerSchema,
  onSubmit: (field: string, value: string) => void
  onDelete?: (data?: CustomerSchema) => Promise<any>
  isPending?: boolean
}

export function CustomerForm({data, onSubmit}: ICustomerSheetsProps) {
  const disabled = false
  const form = useForm<CustomerSchema>({
    // resolver: zodResolver(customerSchema),
    defaultValues: data || DEFAULT_CUSTOMER_VALUE
  })

  // useEffect(() => {
  //   const subscription = form.watch(() => form.handleSubmit(onSubmit)())
  //   return () => subscription.unsubscribe();
  // }, [form.handleSubmit, form.watch])

  // const handleOnSubmit = (data: CustomerSchema) => {onSubmit(data)}

  // const handleOnDelete = () => {
  //   form.clearErrors()
  //   form.setValue('name','')
  //   form.setValue('cpf','')
  //   form.setValue('phone','')
  //   form.setValue('email','')
  //   onDelete()
  // }

  return (
    <Form {...form}>
      <form className={'grid gap-2 py-4'}>
        <Input disabled={disabled} id="name" value={data?.name} label='Nome do cliente' onChange={(e) => onSubmit('name', e?.target?.value || '')} type="text" placeholder="Digite aqui..." />
        <div className="flex gap-2">
          <MaskedInput disabled={disabled} value={data?.cpf} mask={MASKS.CPF} placeholder='000.000.000-00' label='CPF' onChange={(e: any) => onSubmit('cpf', e?.target?.value || '')} />
          <MaskedInput disabled={disabled} value={data?.phone} mask={MASKS.PHONE} maskChar="" placeholder='(00) 00000-0000' label='Telefone' onChange={(e: any) => onSubmit('phone', e?.target?.value || '')} />
        </div>
        <Input disabled={disabled} type="email" value={data?.email} label="Email" placeholder="Digite aqui..." onChange={(e) => onSubmit('email', e?.target?.value || '')}/>
        <Input disabled={disabled} type="text" value={data?.address} label="Endereço" placeholder="Digite aqui..." onChange={(e) => onSubmit('address', e?.target?.value || '')}/>
        {/* <SheetFooter className="mt-4 justify-between">
          {!(data?.id) && <Button type="submit" disabled={isPending}>Salvar</Button>}
          {data?.name && <ConfirmButton 
              onConfirm={() => handleOnDelete()}
              variant={"destructive"}
              disabled={isPending}
              title="Remover cliente"
              message="Deseja realmente remover o cliente desse orçamento?">
                Remover
            </ConfirmButton>}
        </SheetFooter> */}
      </form>
    </Form>
  )
}
