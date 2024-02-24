import { Button } from "@/components/ui/button"
import { SheetFooter} from "@/components/ui/sheet"
import { Car } from "@icon-park/react"
import { Form } from "../../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput, FormSelect } from "../../FormInput"
import { VehicleSheetSchema, defaultVehicleValues, vehicleSheetSchema } from "./schema"
import { SheetContainer } from "../../SheetContainer/SheetContainer"
import { useEffect, useState } from "react"
import brandList from '@/data/json/brands.json'
import colorList from '@/data/json/colors.json'

interface IVehicleSheetsProps {
  trigger: React.ReactElement
  data?: VehicleSheetSchema,
  onSubmit: (data: VehicleSheetSchema) => Promise<any>,
  isPending: boolean
}

export function VehicleFormSheet({data, trigger, onSubmit, isPending}: IVehicleSheetsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<VehicleSheetSchema>({
    resolver: zodResolver(vehicleSheetSchema),
    defaultValues:defaultVehicleValues
  })

  useEffect(() => {
    if(!isOpen) return
    form.clearErrors()
    form.setValue('plate', data?.plate || '')
    form.setValue('brand', data?.brand  || '')
    form.setValue('model', data?.model  || '')
    form.setValue('year', data?.year || '')
    form.setValue('color', data?.color || 'black')
  }, [data, isOpen])

  const handleOnSubmit = (data: VehicleSheetSchema) => {
    onSubmit(data).then(() => {
      setIsOpen(false)
    })
  }

  const handleOnClean = (e: any) => {
    e.preventDefault()
    form.reset()
  }

  return (
    <SheetContainer 
      title="Veículo"
      isOpen={isOpen}
      onIsOpenChange={setIsOpen}
      description="Adicione aqui os dados do veículo. Clique em 'salvar' quando finalizar."
      icon={<Car className="p-1"/>}
      trigger={trigger}>
        <Form {...form}>
          <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(handleOnSubmit)}>
            <FormInput name='plate' label="Placa" type="text" placeholder="ABC-1D23" form={form} className={'uppercase'}/>
            <FormSelect name="brand" label="Marca" options={brandList} form={form} placeholder="Selecione..." />
            <FormInput name='model' label="Modelo" type="text" placeholder="Digite aqui..." form={form}/>
            <FormInput name='year' label="Ano" type="text" placeholder="2024" form={form}/>
            <FormSelect name="color" label="Cor" options={colorList} form={form} placeholder="Selecione..." />
            <SheetFooter className="mt-4">
            <Button type="submit" disabled={isPending}>Salvar</Button>
              <Button variant={"outline"} onClick={handleOnClean} disabled={isPending}>Limpar</Button>
            </SheetFooter>
          </form>
        </Form>
    </SheetContainer>
  )
}
