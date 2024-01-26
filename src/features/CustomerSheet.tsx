import { Button } from "@/components/ui/button"
import DetailCard from "@/components/ui/detailCard"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { User } from "@icon-park/react"

export function CustomerSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <DetailCard side={"left"} title="Cliente" subtitle="Clique aqui para selecionar" fallback={<User fill={"#94A3B8"}/>} className="min-w-[300px]"/>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex"><User className="p-1"/>Cliente</SheetTitle>
          <SheetDescription>
            Adicione aqui os dados do solicitante do orçamento. Clique em 'salvar' quando finalizar.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nome</Label>
            <Input id="name" className="col-span-3"  placeholder="Digite aqui..."/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cpf" className="text-right">CPF</Label>
            <Input id="cpf" className="col-span-3" placeholder="000.000.000-00"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">Telefone</Label>
            <Input id="phone" placeholder="(00) 00000-0000" type="tel" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">E-mail</Label>
            <Input id="email" placeholder="funilaria@contato.com" type="email" className="col-span-3" />
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
