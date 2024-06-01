import { File, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FileSelect from "@/components/ui/fileSelect";
import { CustomerFormSheet } from "@/components/FormSheet/Customer";
import { VehicleFormSheet } from "@/components/FormSheet/Vehicle";
import { useQuery } from "@tanstack/react-query";
import { getServiceOrderAPI } from "@/data/ServiceOrder";
import ServiceOrderCard from "../../components/ServiceOrderCard/ServiceOrderCard";
import { ServiceOrderItem } from "./types";
import { getCarServicesAPI } from "@/data/CarServices";
import { CustomerSchema, DEFAULT_CUSTOMER_VALUE } from "@/components/FormSheet/Customer/schema";
import { VehicleSchema, DEFAULT_VEHICLE_VALUES } from "@/components/FormSheet/Vehicle/schema";
import { toast } from "sonner";
import StatusDropDown from "@/components/BadgeDropDown/BadgeDropDown";
import { SO_STATUS_LIST } from "@/data/constants/utils";
import { PDFViewer } from "@react-pdf/renderer";
import { ServiceOrderPDF } from "@/components/PDF/ServiceOrderPDF";
import { Modal } from "@/components/Modal/Modal";
import CarServiceSelector from "@/components/CarPartsSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { create } from "zustand"

const useStore = create((set: any) => ({
  customer: DEFAULT_CUSTOMER_VALUE,
  vehicle: DEFAULT_VEHICLE_VALUES,
  items: [],
  car_map: {},
  setCustomer: (customer: CustomerSchema) => set(() => ({customer})),
  setVehicle: (vehicle: VehicleSchema) => set(() => ({vehicle})),
  setItems: (items: ServiceOrderItem[]) => set(() => ({items})),
  addItem: (newItem: ServiceOrderItem) => set((state: any) => ({items: [...state.items, newItem]}))
}))

function ServiceOrderPage() {
  const [status, setStatus] = useState('pending')

  const { setCustomer, setVehicle, addItem, customer, vehicle, items } = useStore()

  const {data: carServices} = useQuery({queryKey: ['car-services'],queryFn: getCarServicesAPI,refetchOnWindowFocus: false})

  const { data: serviceOrder } = useQuery({queryFn: getServiceOrderAPI,queryKey: ['service-order'],refetchOnWindowFocus: false})

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
    setCustomer(customer)
  }

  const handleVehicleSubmit = async (vehicle: VehicleSchema) => {
    toast.message("Veículo adicionado com sucesso!")
    setVehicle(vehicle)
  }

  const handleNewSOItem = async (newItem: ServiceOrderItem) => {
    toast.message("Novo item adicionado com sucesso!")
    addItem(newItem)
  }

  const cleanVehicleData = async () => {
    setVehicle(DEFAULT_VEHICLE_VALUES)
  }

  const cleanCustomerData = async () => setCustomer(DEFAULT_CUSTOMER_VALUE)

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
        </div>
        <StatusDropDown value={status} title="Situação atual" options={SO_STATUS_LIST} onChange={setStatus}/>
        
      </header>

      <div className="flex-1 flex gap-4">
        {/* Left side */}
        <div className="flex w-[500px] flex-col gap-4">
        {/* <CarServiceSelector/> */}
          <Tabs defaultValue="customer" className="">
            <TabsList>
              <TabsTrigger value="customer">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="damage">Áreas Danificadas</TabsTrigger>
            </TabsList>
            <TabsContent value="customer">
              <div className="flex flex-col gap-4">
                <Card className="px-4 rounded-lg">
                  <CustomerFormSheet 
                    onSubmit={handleCustomerSubmit}
                    onDelete={cleanCustomerData}
                    isPending={false}
                    data={customer}
                  />
                </Card>
                <Card className="px-4 rounded-lg">
                    <VehicleFormSheet 
                      onSubmit={handleVehicleSubmit}
                      onDelete={cleanVehicleData}
                      isPending={false}
                      data={vehicle}
                    />
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="damage">
              <CarServiceSelector/>
              <Card className="p-4 rounded-lg mt-8">
                <FileSelect label="Imagens"/>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* right Side */}
        <div className="flex flex-1 flex-col">
          <h2 className="text-lg font-bold pb-4">Orçamento</h2>
          <ServiceOrderCard data={items} carServices={carServices || []} onAddItem={handleNewSOItem}/>
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