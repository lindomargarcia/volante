import { Button } from "@/components/ui/button"
import DetailCard from "@/components/ui/detailCard"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SelectOption from "@/components/ui/selectOptions"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Car } from "@icon-park/react"

export function VehicleSheet() {
  const brandsList = ["Acura", "Alfa Romeo", "Audi", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge",
  "Ferrari", "Fiat", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini",
  "Land Rover", "Lexus", "Lincoln", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan",
  "Porsche", "Ram", "Smart", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"]


  return (
    <Sheet>
      <SheetTrigger asChild>
        <DetailCard side={"right"} title="Veículo" subtitle="Clique aqui para selecionar" fallback={<Car fill={"#94A3B8"}/>} className="min-w-[300px]"/>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex"><Car className="p-1"/>Veículo</SheetTitle>
          <SheetDescription>
            Adicione aqui os dados do veículo. Clique em 'salvar' quando finalizar.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="plate" className="text-right">Placa</Label>
            <Input id="plate" placeholder="ABC-1D23" className="col-span-3 uppercase" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">Marca</Label>
            <SelectOption options={brandsList} placeholder="Selecione..." className="col-span-3"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">Modelo</Label>
            <Input id="model" placeholder="Digite aqui..." className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center text-right gap-4">
            <Label htmlFor="year">Ano</Label>
            <Input id="year" placeholder={"2024"} className="w-[120px]"/>
            <Label htmlFor="color" className="">Cor</Label>
            <Input id='color' type="color" className="min-w-[48px]"/>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Salvar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
