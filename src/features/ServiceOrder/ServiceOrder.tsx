import { Car, Download, Send, User } from "@icon-park/react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FileSelect from "@/components/ui/fileSelect";
import { CustomerFormSheet } from "@/components/FormSheet/Customer";
import { VehicleFormSheet } from "@/components/FormSheet/Vehicle";
import DetailCard from "@/components/ui/detailCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceOrderAPI, putServiceOrderAPI, putServiceOrderCustomerAPI, putServiceOrderVehicleAPI } from "@/data/ServiceOrder";
import { VehicleSheetSchema } from "@/components/FormSheet/Vehicle/schema";
import ItemsDataTable from "./ItemsDataTable/ItemsDataTable";
import { ServiceOrder } from "./types";
import { FormInput, FormSelect } from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { getCarServicesAPI } from "@/data/CarServices";

function ServiceOrderPage() {
  const [show, setShow] = useState(false)
  const queryClient = useQueryClient()
  const form = useForm({ defaultValues: {duration_quantity: 0} })

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

  const { mutateAsync: putServiceOrder } = useMutation({
    mutationFn: putServiceOrderAPI,
    onSuccess: () => {
      queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
        return {...data, }
      })
    }
  })

  const { mutateAsync: putServiceOrderCustomer, isPending: isCustomerPending } = useMutation({
    mutationFn: putServiceOrderCustomerAPI,
    onSuccess(__, variables) {
      queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
        return {...data, customer: variables}
      })
    },
  })

  const { mutateAsync: putServiceOrderVehicle, isPending: isVehiclePending } = useMutation({
    mutationFn: putServiceOrderVehicleAPI,
    onSuccess(__, variables) {
      queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
        return {...data, vehicle: variables}
      })
    },
  })

  const onSubmitHandle = (data: any) => {
    //O .setQueryData() abaixo faz a tabela ser toda renderizada quando clica em salvar
    // queryClient.setQueryData(['service-order'], (serviceOrder: ServiceOrder) => {
    //   return {...serviceOrder, ...data}
    // })

    let newSO = queryClient.getQueryData<ServiceOrder>(['service-order'])
    newSO = {...newSO, ...data}
    console.log(newSO)
    putServiceOrder(newSO)
  }

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
    <div className="flex flex-1 flex-row flex-wrap p-8 gap-10">
      {/* Left Side */}
      <div className="flex flex-1 flex-col basis-3/5">
        <div className="flex flex-row justify-items-center items-center mb-8">
          <div className="flex-col flex-1">
            <h3 className="text-2xl font-semibold">Novo orçamento</h3>
            <p className="text-sm text-muted-foreground">Último salvo {serviceOrder?.last_saved_at ? new Date(serviceOrder?.last_saved_at).toLocaleString() : '...'}</p>
          </div>
          <Badge className="h-8 rounded-full" onClick={() => setShow(!show)}>{serviceOrder?.status || 'buscando...'}</Badge>
        </div>

        <div className="flex mb-8 flex-wrap">
          <CustomerFormSheet 
            onSubmit={putServiceOrderCustomer}
            isPending={isCustomerPending}
            data={serviceOrder?.customer}
            trigger={<DetailCard side={"left"} title={serviceOrder?.customer.name || "Cliente"} ready={serviceOrder?.customer.name ? true : false} subtitle={serviceOrder?.customer.phone || "Clique aqui para selecionar"} fallback={<User size={"20px"}/>} className="min-w-[300px]"/>}
          />
          <VehicleFormSheet 
            onSubmit={putServiceOrderVehicle}
            isPending={isVehiclePending}
            data={serviceOrder?.vehicle}
            trigger={<DetailCard side={"right"} title={getVehicleSheetTriggerTitle(serviceOrder?.vehicle)} ready={serviceOrder?.vehicle.plate ? true : false}  subtitle={serviceOrder?.vehicle.plate.toLocaleUpperCase() || "Clique aqui para selecionar"} fallback={<Car size={"20px"}/>} className="min-w-[300px]"/>}
          />
        </div>

        <ItemsDataTable data={serviceOrder?.items || []} carServices={carServices || []}/>
      
      </div>

      {/* Right Side */}
      <div className="flex flex-1 flex-col">
        
        <div className="flex justify-end h-[60px]">
          {/* <Button variant={"ghost"}><MoreOne size={22}/></Button> */}
        </div>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmitHandle)} className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col gap-3">
                <FormSelect label="Seguradora" name="insurance_company" form={form} options={[{value: 'none', label: 'Não há'}, {value: 'blue', label: 'Azul'}]} placeholder="Selecione..." containerClassName="w-[150px]" direction={"col"}/>
                <span>
                  <Label htmlFor="duration" className="font-bold">Duraçao Aproximada</Label>
                  <span className="flex gap-1">
                    <FormInput form={form} name="duration_quantity" placeholder="0" type="number" key={"duration_quantity"} containerClassName="w-[70px]"/>
                    <FormSelect name="duration_type" form={form} options={[{label: 'Horas', value: "hour"}, {label: 'Dias', value: 'day'}, {label: 'Semanas', value: 'week'}, {label: 'Meses', value: 'month'}, {label: 'Anos', value: "year"}]} placeholder="Selecione..." className="flex-1"/>
                  </span>
                </span>
                <FileSelect label="Imagens"/>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline"><Send className="mr-2"/>Compartilhar</Button>
              <Button type="submit"><Download className="mr-2"/>Salvar</Button>
            </div>
          </form>
        </Form>

      </div>
    </div>
  );
}

export default ServiceOrderPage;
