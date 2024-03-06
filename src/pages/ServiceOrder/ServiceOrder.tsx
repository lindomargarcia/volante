import { Car, Download, MoreVertical, Send, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FileSelect from "@/components/ui/fileSelect";
import { CustomerFormSheet } from "@/components/FormSheet/Customer";
import { VehicleFormSheet } from "@/components/FormSheet/Vehicle";
import DetailCard from "@/components/ui/detailCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceOrderAPI } from "@/data/ServiceOrder";
import ServiceOrderTable from "../../components/ServiceOrderTable/ServiceOrderTable";
import { ServiceOrder, ServiceOrderItem } from "./types";
import { FormInput, FormSelect } from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { getCarServicesAPI } from "@/data/CarServices";
import { generateVehicleDescription } from "@/components/FormSheet/Vehicle/utils";
import { z } from "zod";
import { CustomerSchema } from "@/components/FormSheet/Customer/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleSchema } from "@/components/FormSheet/Vehicle/schema";
import { toast } from "sonner";

const ServiceOrderSchema = z.object({
  // customer: customerSchema
})

function ServiceOrderPage() {
  const [show, setShow] = useState(false)
  const queryClient = useQueryClient()
  const form = useForm({ resolver: zodResolver(ServiceOrderSchema), defaultValues: {
    duration_quantity: 1,
    customer: {name: "", cpf: "", phone: "", email: ""}
  } })

  const {data: carServices} = useQuery({
    queryKey: ['car-services'],
    queryFn: getCarServicesAPI,
    refetchOnWindowFocus: false
  })

  const { data: serviceOrder } = useQuery({
    queryFn: getServiceOrderAPI,
    queryKey: ['service-order'],
    refetchOnWindowFocus: false
  })

  const onSubmitHandle = (data: any) => {
    console.log(serviceOrder, data)
    toast.success('Salvo com sucesso', )
    // let newSO = queryClient.getQueryData<ServiceOrder>(['service-order'])
    // newSO = {...newSO, ...data}
    // console.log(newSO)
    // putServiceOrder(newSO)
  }

  const handleCustomerSubmit = async (customer: CustomerSchema) => {
    toast.message("Cliente adicionado com sucesso!")
    //Setar no form Geral
    queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
      return {...data, customer} 
    })
  }

  const handleVehicleSubmit = async (vehicle: VehicleSchema) => {
    toast.message("Veículo adicionado com sucesso!")
    //Setar no form Geral
    queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
      return {...data, vehicle}
    })
  }

  const handleNewSOItem = async (newItem: ServiceOrderItem) => {
    console.log(newItem)
    //Setar no form Geral
    queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
      const newSO = {...data}
      newSO.items = [...newSO.items, newItem]
      return newSO
    })
  }


  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center pb-8">
        <div className="flex gap-10 flex-1">
          <div>
            <h1 className="text-2xl font-semibold">Novo orçamento</h1>
            <p className="text-sm text-muted-foreground">
              Último salvo {serviceOrder?.last_saved_at ? new Date(serviceOrder?.last_saved_at).toLocaleString() : '...'}
            </p>
          </div>
          <Badge className="h-8 rounded-full bg-violet-500" onClick={() => setShow(!show)}>{serviceOrder?.status || 'buscando...'}</Badge>
        </div>

        <Button variant={"link"}>
          <MoreVertical size={18}/>
        </Button>
      </header>

      <div className="flex-1 flex gap-10">
        
        {/* Left side */}
        <div className="flex flex-col w-[300px] gap-4">
          <VehicleFormSheet 
            onSubmit={handleVehicleSubmit}
            isPending={false}
            data={serviceOrder?.vehicle}
            trigger={<DetailCard title={generateVehicleDescription(serviceOrder?.vehicle)} ready={serviceOrder?.vehicle.plate ? true : false}  subtitle={serviceOrder?.vehicle.plate.toLocaleUpperCase() || "Clique aqui para selecionar"} fallback={<Car size={"25px"}/>} className="min-w-[200px] h-[110px]"/>}
          />
          <CustomerFormSheet 
            onSubmit={handleCustomerSubmit}
            isPending={false}
            data={serviceOrder?.customer}
            trigger={<DetailCard title={serviceOrder?.customer.name || "Cliente"} ready={serviceOrder?.customer.name ? true : false} subtitle={serviceOrder?.customer.phone || "Clique aqui para selecionar"} fallback={<User size={"25px"}/>} className="min-w-[200px] h-[110px]"/>}
          />
          
          {/* <img src="https://i.ibb.co/t3vH68T/image-removebg-preview.png" className="flex-1 object-cover"/> */}
        </div>

        {/* center Side */}
        <div className="flex-1 flex flex-col">
          <ServiceOrderTable data={serviceOrder?.items || []} carServices={carServices || []} onAddItem={handleNewSOItem}/>
        </div>

        {/* Right Side */}
        <div className="flex flex-col">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmitHandle)} className="flex flex-col flex-1">
              
              <div className="flex flex-1 flex-col gap-3">
                  <FormSelect label="Seguradora" name="insurance_company" form={form} options={[{value: 'none', label: 'Não há'}, {value: 'blue', label: 'Azul'}]} placeholder="Selecione..." containerClassName="w-[150px]" direction={"col"}/>
                  <span>
                    <Label htmlFor="duration" className="font-bold">Duração Aproximada</Label>
                    <span className="flex gap-1">
                      <FormInput form={form} name="duration_quantity" placeholder="0" type="number" key={"duration_quantity"} containerClassName="w-[70px]"/>
                      <FormSelect name="duration_type" form={form} options={[{label: 'Horas', value: "hour"}, {label: 'Dias', value: 'day'}, {label: 'Semanas', value: 'week'}, {label: 'Meses', value: 'month'}, {label: 'Anos', value: "year"}]} placeholder="Selecione..." className="flex-1"/>
                    </span>
                  </span>
                  <FileSelect label="Imagens"/>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline"><Send size={18} className="mr-2"/>Compartilhar</Button>
                <Button type="submit"><Download size={18} className="mr-2"/>Salvar</Button>
              </div>
            </form>
          </Form>

        </div>
      </div>
    </div>
  );
}

export default ServiceOrderPage;
