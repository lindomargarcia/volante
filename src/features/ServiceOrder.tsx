import { Car, MoreOne, User } from "@icon-park/react";
import { Badge } from "@/components/ui/badge";
import PriceTag from "@/components/ui/priceTag";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DetailCard from "@/components/ui/detailCard";
import SelectOption from "@/components/ui/selectOptions";
import FileSelect from "@/components/ui/fileSelect";

function ServiceOrder() {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-1 flex-row p-8 gap-10">
      {/* Left Side */}
      <div className="flex flex-1 flex-col basis-3/5">
        <div className="flex flex-row justify-items-center items-center mb-8">
          <div className="flex-col flex-1">
            <h3 className="text-2xl font-semibold">Novo orçamento</h3>
            <p className="text-sm text-muted-foreground">Último salvo 20/01/2024</p>
          </div>
          <Badge className="h-8 rounded-full" onClick={() => setShow(!show)}>Em aberto</Badge>
        </div>

        <div className="flex mb-4">
          <DetailCard side={"left"} title="Cliente" subtitle="Clique aqui para selecionar" fallback={<User fill={"#94A3B8"}/>}/>
          <DetailCard side={"right"} title="Veículo" subtitle="Clique aqui para selecionar" fallback={<Car fill={"#94A3B8"}/>}/>
        </div>

        <div className="flex items-end gap-3">
          <span className="flex-1">
            <Label htmlFor="item">Item</Label>
            <Input id="price" placeholder="Digite aqui..."/>
          </span>
          <span>
            <Label htmlFor="price">Valor</Label>
            <Input id="price" placeholder="0,00" type="number"/>
          </span>
          <Button>Adicionar</Button>
        </div>

        <div className="border radius flex-1 rounded-lg mt-4 mb-3"></div>

        <div className="flex">
          <span className="flex flex-1 gap-8">
            <PriceTag id='pieces-price' label='Peças' value='R$0,00' />
            <PriceTag id='services-price' label='Serviços' value='R$0,00' />
            <PriceTag id='discounts-price' label='Descontos' value='R$0,00' />
          </span>
          <PriceTag id='total-price' label='Total' value='R$0,00' className="text-right" />
        </div>
      
      </div>

      {/* Right Side */}
      <div className="flex flex-1 flex-col basis-1/5">
        
        <div className="flex justify-end h-[60px]">
          <Button variant={"ghost"}><MoreOne size={22}/></Button>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <span>
            <Label htmlFor="insurance">Seguradora</Label>
            <SelectOption placeholder="Selecione uma seguradora..." options={['Não há', 'Porto Seguro', 'Azul']}/>
          </span>
          <span>
            <Label htmlFor="duration">Duraçao Aproximada</Label>
            <span className="flex gap-1">
              <Input id="duration" placeholder="0" type="number" className="w-[100px]"/>
              <SelectOption placeholder="Selecione..." options={['Horas', 'Dias', 'Semanas', 'Meses', 'Anos']}/>
            </span>
          </span>
          <FileSelect label="Imagens"/>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant={"outline"}>Compartilhar</Button>
          <Button>Salvar</Button>
        </div>

      </div>
    </div>
  );
}

export default ServiceOrder;
