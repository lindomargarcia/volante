import { Button } from "@/components/ui/button"
import DetailCard from "@/components/ui/detailCard"
import { Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger } from "@/components/ui/sheet"
import { Car } from "@icon-park/react"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput, FormSelect } from "../FormInput"
import { VehicleSheetSchema, defaultVehicleValues, vehicleSheetSchema } from "./schema"


export function VehicleSheet() {
  const form = useForm<VehicleSheetSchema>({resolver: zodResolver(vehicleSheetSchema), defaultValues:defaultVehicleValues })

  const brandsList = ["Acura", "Alfa Romeo", "Audi", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge",
  "Ferrari", "Fiat", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini",
  "Land Rover", "Lexus", "Lincoln", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan",
  "Porsche", "Ram", "Smart", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"]


  const handleOnSubmit = (data: VehicleSheetSchema) => {
    console.log(data)
  }

  return (
    <Sheet>
      <SheetTrigger className="flex-1">
        <DetailCard side={"right"} title="Veículo" subtitle="Clique aqui para selecionar" fallback={<Car fill={"#94A3B8"}/>} className="min-w-[300px]"/>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex"><Car className="p-1"/>Veículo</SheetTitle>
          <SheetDescription>
            Adicione aqui os dados do veículo. Clique em 'salvar' quando finalizar.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(handleOnSubmit)}>
            <FormInput name='plate' label="Placa" type="text" placeholder="ABC-1D23" form={form}/>
            <FormSelect name="brand" label="Marca" options={brandsList} form={form} placeholder="Selecione..." />
            <FormInput name='model' label="Modelo" type="text" placeholder="Digite aqui..." form={form}/>
            <FormInput name='year' label="Ano" type="text" placeholder="2024" form={form}/>
            <FormSelect name="color" label="Cor" options={['Azul', 'Branco','Vermelho', 'Prata', 'Preto']} form={form} placeholder="Selecione..." />

            <Button type="submit">Salvar</Button>
          </form>
        </Form>

      </SheetContent>
    </Sheet>
  )
}
