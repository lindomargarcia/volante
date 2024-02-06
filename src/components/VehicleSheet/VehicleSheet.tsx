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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { putServiceOrderVehicle } from "@/data/ServiceOrder"
import { ServiceOrder } from "@/features/ServiceOrder/types"

interface IVehicleSheetsProps {
  trigger: React.ReactElement
  vehicle?: VehicleSheetSchema
}

export function VehicleSheet({vehicle, trigger}: IVehicleSheetsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

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
    form.setValue('color', vehicle?.color || 'preto')
  }, [vehicle, isOpen])

  const { mutateAsync: putServiceOrderVehicleFn, isPending } = useMutation({
    mutationFn: putServiceOrderVehicle,
    onSuccess(__, variables) {
      queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
        const newSO = {...data}
        newSO.vehicle = variables
        setIsOpen(false)
        return newSO
      })
    },
  })

  const brandsList = ["Acura", "Alfa Romeo", "Audi", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge",
  "Ferrari", "Fiat", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini",
  "Land Rover", "Lexus", "Lincoln", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan",
  "Porsche", "Ram", "Smart", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"]

  const colorsList = ['azul', 'branco','vermelho', 'verde', 'prata', 'preto']

  const handleOnSubmit = (data: VehicleSheetSchema) => {
    putServiceOrderVehicleFn(data)
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
            <FormSelect name="brand" label="Marca" options={brandsList} form={form} placeholder="Selecione..." />
            <FormInput name='model' label="Modelo" type="text" placeholder="Digite aqui..." form={form}/>
            <FormInput name='year' label="Ano" type="text" placeholder="2024" form={form}/>
            <FormSelect name="color" label="Cor" options={colorsList} form={form} placeholder="Selecione..." />
            <SheetFooter className="mt-4">
              <Button variant={"outline"} onClick={handleOnClean} disabled={isPending}>Limpar</Button>
              <Button type="submit" disabled={isPending}>Salvar</Button>
            </SheetFooter>
          </form>
        </Form>
    </SheetContainer>
  )
}
