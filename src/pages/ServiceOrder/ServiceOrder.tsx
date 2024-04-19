import { File, MoreVertical, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FileSelect from "@/components/ui/fileSelect";
import { CustomerFormSheet } from "@/components/FormSheet/Customer";
import { VehicleFormSheet } from "@/components/FormSheet/Vehicle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceOrderAPI } from "@/data/ServiceOrder";
import ServiceOrderCard from "../../components/ServiceOrderCard/ServiceOrderCard";
import { ServiceOrder, ServiceOrderItem } from "./types";
import { getCarServicesAPI } from "@/data/CarServices";
import { CustomerSchema } from "@/components/FormSheet/Customer/schema";
import { VehicleSchema } from "@/components/FormSheet/Vehicle/schema";
import { toast } from "sonner";
import { VehicleDetailCard, CustomerDetailCard } from "@/components/DetailCard/DetailCard";
import StatusDropDown from "@/components/BadgeDropDown/BadgeDropDown";
import { SO_STATUS_LIST } from "@/data/constants/utils";
import { PDFViewer } from "@react-pdf/renderer";
import { ServiceOrderPDF } from "@/components/PDF/ServiceOrderPDF";
import { Modal } from "@/components/Modal/Modal";
import CarScene from "@/components/3D/CarScene";

function ServiceOrderPage() {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState('pending')
  // const form = useForm({ resolver: zodResolver(ServiceOrderSchema), defaultValues: {
  //   duration_quantity: 1,
  //   customer: {name: "", cpf: "", phone: "", email: ""}
  // } })

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

  // const onSubmitHandle = (data: any) => {
  //   console.log(serviceOrder, data)
  //   toast.success('Salvo com sucesso', )
  //   // let newSO = queryClient.getQueryData<ServiceOrder>(['service-order'])
  //   // newSO = {...newSO, ...data}
  //   // console.log(newSO)
  //   // putServiceOrder(newSO)
  // }

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

  const handleVehicleDelete = async () => {
    queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
      return {...data, vehicle: {}}
    })
  }

  const handleCustomerDelete = async () => {
    queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
      return {...data, customer: {}}
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

          <StatusDropDown value={status} title="Situação atual" options={SO_STATUS_LIST} onChange={setStatus}/>
          
        </div>

        <Button variant={"link"}>
          <MoreVertical size={18}/>
        </Button>
      </header>

      <div className="flex-1 flex gap-10">
        {/* Left side */}
        <div className="flex flex-1 flex-col gap-4">
          <h1 className="text-sm font-bold">Áreas danificadas</h1>
          <CarScene/>
          {/* <VehicleFormSheet 
            onSubmit={handleVehicleSubmit}
            onDelete={handleVehicleDelete}
            isPending={false}
            data={serviceOrder?.vehicle}
            trigger={<VehicleDetailCard vehicle={serviceOrder?.vehicle}/>}
          />
          <CustomerFormSheet 
            onSubmit={handleCustomerSubmit}
            onDelete={handleCustomerDelete}
            isPending={false}
            data={serviceOrder?.customer}
            trigger={<CustomerDetailCard customer={serviceOrder?.customer}/>}
          />
          <FileSelect label="Imagens"/> */}
        </div>

        {/* right Side */}
        <div className="flex flex-col">
          <ServiceOrderCard data={serviceOrder?.items || []} carServices={carServices || []} onAddItem={handleNewSOItem}/>
          <div className="flex mt-6 justify-end items-end gap-3">
            <Modal 
              trigger={<Button variant="outline"><File size={18} className="mr-2"/>PDF</Button>}
              title='Orçamento'
              subtitle='Envie ou imprima para seu cliente'
              className="min-h-[calc(100vh-180px)]"
              async={true}>
                <PDFViewer className="w-full min-h-[calc(100vh-180px)]">
                  <ServiceOrderPDF data={serviceOrder}/>
                </PDFViewer>
            </Modal>
            <Button type="submit">
              <Save size={18} className="mr-2"/>Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceOrderPage;