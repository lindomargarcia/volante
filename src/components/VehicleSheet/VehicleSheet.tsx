import { Button } from "@/components/ui/button"
import { SheetFooter} from "@/components/ui/sheet"
import { Car } from "@icon-park/react"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput, FormSelect } from "../FormInput"
import { VehicleSheetSchema, defaultVehicleValues, vehicleSheetSchema } from "./schema"
import { SheetContainer } from "../SheetContainer/SheetContainer"

interface IVehicleSheetsProps {
  trigger: React.ReactElement
}

export function VehicleSheet({trigger}: IVehicleSheetsProps) {
  const form = useForm<VehicleSheetSchema>({resolver: zodResolver(vehicleSheetSchema), defaultValues:defaultVehicleValues })

  const brandsList = ["Acura", "Alfa Romeo", "Audi", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge",
  "Ferrari", "Fiat", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini",
  "Land Rover", "Lexus", "Lincoln", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan",
  "Porsche", "Ram", "Smart", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"]


  const handleOnSubmit = (data: VehicleSheetSchema) => {
    console.log(data)
  }

  const handleOnClean = (e: any) => {
    e.preventDefault()
    form.reset()
  }

  return (
    <SheetContainer 
      title="Veículo"
      description="Adicione aqui os dados do veículo. Clique em 'salvar' quando finalizar."
      icon={<Car className="p-1"/>}
      trigger={trigger}>
        <Form {...form}>
          <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(handleOnSubmit)}>
            <FormInput name='plate' label="Placa" type="text" placeholder="ABC-1D23" form={form}/>
            <FormSelect name="brand" label="Marca" options={brandsList} form={form} placeholder="Selecione..." />
            <FormInput name='model' label="Modelo" type="text" placeholder="Digite aqui..." form={form}/>
            <FormInput name='year' label="Ano" type="text" placeholder="2024" form={form}/>
            <FormSelect name="color" label="Cor" options={['Azul', 'Branco','Vermelho', 'Prata', 'Preto']} form={form} placeholder="Selecione..." />
            <SheetFooter className="mt-4">
              <Button variant={"outline"} onClick={handleOnClean}>Limpar</Button>
              <Button type="submit">Salvar</Button>
            </SheetFooter>
          </form>
        </Form>
    </SheetContainer>
  )
}
