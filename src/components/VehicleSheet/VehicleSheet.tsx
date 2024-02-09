import { Button } from "@/components/ui/button"
import { SheetFooter} from "@/components/ui/sheet"
import { Car } from "@icon-park/react"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput, FormSelect } from "../FormInput"
import { VehicleSheetSchema, defaultVehicleValues, vehicleSheetSchema } from "./schema"
import { SheetContainer } from "../SheetContainer/SheetContainer"
import { useEffect, useState } from "react"
import brandList from '../../data/brands.json'

const colorsList = [
  {'label': 'Branco', value: 'white', color: 'bg-white border'},
  {'label': 'Azul', value: 'blue', color: 'bg-blue-500'},
  {'label': 'Vermelho', value: 'red', color: 'bg-red-500'},
  {'label': 'Verde', value: 'green', color: 'bg-green-500'},
  {'label': 'Prata', value: 'silver', color: 'bg-gray-500'},
  {'label': 'Preto', value: 'black', color: 'bg-black'},
  {'label': 'Amarelo', 'value': 'yellow', 'color': 'bg-yellow-500'},
  {'label': 'Rosa', 'value': 'pink', 'color': 'bg-pink-500'},
  {'label': 'Roxo', 'value': 'purple', 'color': 'bg-purple-500'},
  {'label': 'Laranja', 'value': 'orange', 'color': 'bg-orange-500'},
  {'label': 'Cinza', 'value': 'gray', 'color': 'bg-gray-500'},
  {'label': 'Marrom', 'value': 'brown', 'color': 'bg-amber-900'},
  {'label': 'Outro', 'value': 'bronze', 'color': 'bg-gradient-to-tl from-indigo-400 via-fuchsia-200 to-purple-100'}]
interface IVehicleSheetsProps {
  trigger: React.ReactElement
  vehicle?: VehicleSheetSchema,
  onChange: (data: VehicleSheetSchema) => Promise<any>,
  isPending: boolean
}

export function VehicleSheet({vehicle, trigger, onChange, isPending}: IVehicleSheetsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<VehicleSheetSchema>({
    resolver: zodResolver(vehicleSheetSchema),
    defaultValues:defaultVehicleValues
  })

  useEffect(() => {
    if(!isOpen) return
    form.clearErrors()
    form.setValue('plate', vehicle?.plate || '')
    form.setValue('brand', vehicle?.brand  || '')
    form.setValue('model', vehicle?.model  || '')
    form.setValue('year', vehicle?.year || '')
    form.setValue('color', vehicle?.color || 'black')
  }, [vehicle, isOpen])

  const handleOnSubmit = (data: VehicleSheetSchema) => {
    onChange(data).then(() => {
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
            <FormSelect name="color" label="Cor" options={colorsList} form={form} placeholder="Selecione..." />
            <SheetFooter className="mt-4">
            <Button type="submit" disabled={isPending}>Salvar</Button>
              <Button variant={"outline"} onClick={handleOnClean} disabled={isPending}>Limpar</Button>
            </SheetFooter>
          </form>
        </Form>
    </SheetContainer>
  )
}
