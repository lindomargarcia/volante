import { CustomerSchema } from "./schema"
import MaskedInput from "@/components/MaskedInput/MaskedInput"
import { MASKS } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useState } from "react"
interface ICustomerSheetsProps {
  data: CustomerSchema,
  onSubmit: (field: string, value: string) => void
  onDelete?: (data?: CustomerSchema) => Promise<any>
  isPending?: boolean
}

export function CustomerForm({data, onSubmit}: ICustomerSheetsProps) {
  const [name, setName] = useState(data?.name || '')
  const [cpf, setCpf] = useState(data?.cpf || '')
  const [phone, setPhone] = useState(data?.phone || '')
  const [address, setAddress] = useState(data?.address || '')
  const [email, setEmail] = useState(data?.email || '')

  const disabled = false
  // const form = useForm<CustomerSchema>({
  //   // resolver: zodResolver(customerSchema),
  //   defaultValues: data || DEFAULT_CUSTOMER_VALUE
  // })

  // useEffect(() => {
  //   const subscription = form.watch(() => form.handleSubmit(onSubmit)())
  //   return () => subscription.unsubscribe();
  // }, [form.handleSubmit, form.watch])

  // const handleOnDelete = () => {
  //   form.clearErrors()
  //   form.setValue('name','')
  //   form.setValue('cpf','')
  //   form.setValue('phone','')
  //   form.setValue('email','')
  //   onDelete()
  // }

  return (
    <>
      <form className={'grid gap-2 py-4'}>
        <Input disabled={disabled} id="name" value={name} label='Nome do cliente' onChange={(e: any) => setName(e.target.value)} onBlur={() => onSubmit('name', name)} type="text" placeholder="Digite aqui..." />
        <div className="flex gap-2">
          <MaskedInput disabled={disabled} value={cpf} mask={MASKS.CPF} placeholder='000.000.000-00' label='CPF' onBlur={() => onSubmit('cpf', cpf)} onChange={(e: any) => setCpf(e.target.value)}/>
          <MaskedInput disabled={disabled} value={phone} mask={MASKS.PHONE} maskChar="" placeholder='(00) 00000-0000' label='Telefone' onBlur={() => onSubmit('phone', phone)} onChange={(e: any) => setPhone(e.target.value)}/>
        </div>
        <Input disabled={disabled} type="email" value={email} label="Email" placeholder="Digite aqui..." onBlur={() => onSubmit('email', email)} onChange={(e) => setEmail(e.target.value)}/>
        <Input disabled={disabled} type="text" value={address} label="Endereço" placeholder="Digite aqui..." onBlur={() => onSubmit('address', address)} onChange={(e) => setAddress(e.target.value)}/>
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
    </>
  )
}
