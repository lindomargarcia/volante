import { Car, MoreOne, User } from "@icon-park/react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectOption from "@/components/ui/selectOptions";
import FileSelect from "@/components/ui/fileSelect";
import { CustomerSheet } from "../../components/CustomerSheet/CustomerSheet";
import { VehicleSheet } from "../../components/VehicleSheet/VehicleSheet";
import DetailCard from "@/components/ui/detailCard";
import { useQuery } from "@tanstack/react-query";
import { getServiceOrder } from "@/data/ServiceOrder";
import { VehicleSheetSchema } from "@/components/VehicleSheet/schema";
import ItemsDataTable from "./ItemsDataTable/ItemsDataTable";

function ServiceOrderPage() {
  const [show, setShow] = useState(false)
  const { data: serviceOrder } = useQuery({
    queryFn: getServiceOrder,
    queryKey: ['service-order']
  })

  const getVehicleSheetTriggerTitle = (vehicle?: VehicleSheetSchema) => {
    if(vehicle?.brand && vehicle?.model){
      return `${vehicle.brand} ${vehicle.model}`
    }else if(vehicle?.brand){
      return vehicle.brand
    }else{
      return 'Veículo'
    }
  }

  return (
    <div className="flex flex-1 flex-row p-8 gap-10">
      {/* Left Side */}
      <div className="flex flex-1 flex-col basis-3/5">
        <div className="flex flex-row justify-items-center items-center mb-8">
          <div className="flex-col flex-1">
            <h3 className="text-2xl font-semibold">Novo orçamento</h3>
            <p className="text-sm text-muted-foreground">Último salvo {serviceOrder?.last_saved_at ? new Date(serviceOrder?.last_saved_at).toLocaleString() : '...'}</p>
          </div>
          <Badge className="h-8 rounded-full" onClick={() => setShow(!show)}>{serviceOrder?.status || 'buscando...'}</Badge>
        </div>

        <div className="flex mb-4 flex-wrap">
          <CustomerSheet customer={serviceOrder?.customer} trigger={<DetailCard side={"left"} title={serviceOrder?.customer.name || "Cliente"} subtitle={serviceOrder?.customer.phone || "Clique aqui para selecionar"} fallback={<User fill={"#94A3B8"}/>} className="min-w-[300px]"/>}/>
          <VehicleSheet vehicle={serviceOrder?.vehicle} trigger={<DetailCard side={"right"} title={getVehicleSheetTriggerTitle(serviceOrder?.vehicle)} subtitle={serviceOrder?.vehicle.plate.toLocaleUpperCase() || "Clique aqui para selecionar"} fallback={<Car fill={"#94A3B8"}/>} className="min-w-[300px]"/>}/>
        </div>

        <ItemsDataTable data={serviceOrder?.items || []}/>
      
      </div>

      {/* Right Side */}
      <div className="flex flex-1 flex-col basis-1/5">
        
        <div className="flex justify-end h-[60px]">
          <Button variant={"ghost"}><MoreOne size={22}/></Button>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <span>
            <Label htmlFor="insurance">Seguradora</Label>
            <SelectOption placeholder="Selecione uma seguradora..." options={['Não há', 'Allianz', 'Azul', 'Porto Seguro']}/>
          </span>
          <span>
            <Label htmlFor="duration">Duraçao Aproximada</Label>
            <span className="flex gap-1">
              <Input id="duration" placeholder="0" className="w-[100px]"/>
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

export default ServiceOrderPage;
