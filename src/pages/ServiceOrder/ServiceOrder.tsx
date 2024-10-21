import { Check, File, Save, User, X } from "lucide-react";
import {useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomerForm } from "@/components/FormSheet/Customer";
import { VehicleForm } from "@/components/FormSheet/Vehicle";
import ServiceOrderItems from "../../components/ServiceOrderItems/ServiceOrderItems";
import { ServiceOrderItem, STATUS_SERVICE_ORDER } from "./types";
import { toast } from "sonner";
import StatusDropDown from "@/components/BadgeDropDown/BadgeDropDown";
import { SO_STATUS_LIST } from "@/data/constants/utils";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ServiceOrderPDF } from "@/components/PDF/ServiceOrderPDF";
import { Modal } from "@/components/Modal/Modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useServiceOrderStore } from "@/hooks/useServiceOrder";
import { deleteServiceOrderItem, putServiceOrderAPI } from "@/data/api/ServiceOrderAPI";
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";
import { nanoid } from "nanoid/non-secure";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";

function ServiceOrderPage() {
  const [activeTab, setActiveTab] = useState<'customer' | 'damage' | string>('customer')
  const {id, customer, vehicle, status, setId, setCustomer, setVehicle, service_order_items, setItems, setStatus
  } = useServiceOrderStore()
  const methods = useForm()

  useEffect(() => {
    return () => {
      // reset()
    }
  }, [])

  const handleNewSOItem = async (newItem: ServiceOrderItem) => {
    // toast.message("Novo item adicionado com sucesso!")
    setItems([newItem, ...service_order_items])
  }

  const handleChangeItem = (changedItem: ServiceOrderItem) => {
    const updatedItems = service_order_items.map((item) => {
      return (item.id === changedItem.id) ? changedItem : item
    })
    setItems(updatedItems)
  }

  const handleRemoveItem = (deletedItem: ServiceOrderItem) => {
    deleteServiceOrderItem(deletedItem.id).then(() => {
      const updatedItems = service_order_items.filter((item) => (item.id !== deletedItem.id))
      setItems(updatedItems)
    })
  }

  // const handleCarMapChange = async (selected: IChangeValue, data: ICarSelectionValue) => {
  //   if(selected.action.value === CAR_ACTIONS.DAMAGE) return

  //   const newItem: ServiceOrderItem = {id: '389', description: selected.action.value + ' ' + selected.car_part, discount: 0, quantity: 1, total: 50, type: selected.action.value, insurance_coverage: 0, value: 50}
  //   setItems([newItem, ...service_order_items])
  //   setCarMap(data)
  // }

  // const getVehicleColor = (vehicle: VehicleSchema) => {
  //   return COLORS.find(color => color.value === vehicle?.color)?.code || "#000"
  // }

  const handleOnSave = (data: any) => {
    return console.log(data)
    const { customer, vehicle, service_order_items, status, startAt, endAt, note } = data
    putServiceOrderAPI({id, customer, vehicle, service_order_items, status, startAt, endAt, note}).then((data) => {
      if(data){
        data?.customer && setCustomer(data?.customer)
        data?.vehicle && setVehicle(data?.vehicle)
        toast.message("Salvo com sucesso!", { icon: <Check/>})
      }else{
        toast.message("Erro ao salvar", { icon: <X/>})
      }
    })
  }

  const onDuplicateClick = () => {
    const newOSId = nanoid()
    setId(newOSId)
    setStatus(STATUS_SERVICE_ORDER.PENDING)
    const duplicatedItems = service_order_items.map(item => ({...item, id: nanoid(), serviceOrderId: newOSId }))
    setItems(duplicatedItems)
    toast.message('Duplicado com sucesso!')
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleOnSave)} className="h-fullgap-2 flex-1 flex flex-wrap">
      {/* Left side */}
      <div className="flex w-[400px] overflow-scroll flex-col gap-4 pb-14 pt-[7px]">
      {/* <CarServiceSelector/> */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="customer"><User className="w-[18px] mr-2"/>Dados Pessoais</TabsTrigger>
            {/* <TabsTrigger value="damage"><Car className="w-[18px] mr-2"/>Mapa Veicular</TabsTrigger> */}
          </TabsList>
          {/* <TabsContent value="damage" hidden={activeTab !== 'damage'} forceMount>
            <CarServiceSelector color={getVehicleColor(vehicle)} value={car_map} onChange={handleCarMapChange}/>
            <Card className="p-4 rounded-lg mt-3">
              <FileSelect label="Imagens"/>
            </Card>
          </TabsContent> */}
          <TabsContent value="customer">
            <div className="flex flex-col gap-2">
              <Card className="px-4 rounded-lg">
                <CustomerForm 
                  isPending={false}
                />
              </Card>
              <Card className="px-4 rounded-lg">
                <VehicleForm
                  isPending={false}
                />
              </Card>
              <Card className="flex flex-col p-4 rounded-lg gap-1">
                <span className="text-sm font-medium m-0 p-0">Anotações</span>
                <textarea className="border m-0 p-2 rounded" {...methods.register('note')}/>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* right Side */}
      <div className="flex flex-1 flex-col">

        <header className="flex items-center pb-4 gap-4">
          <div className="flex flex-1">
            <h1 className="text-2xl font-semibold">Orçamento</h1>
          </div>
          <div className="flex gap-4 items-center">
            <Input type="date" {...methods.register('startAt')}/>
            <p>até</p>
            <Input type="date" {...methods.register('endAt')}/>
          </div>
          <StatusDropDown value={methods.watch('status', STATUS_SERVICE_ORDER.PENDING)} title="Situação atual" options={SO_STATUS_LIST} onChange={value => methods.setValue('status', value)}/>
        </header>

        <ServiceOrderItems 
          data={service_order_items}
          onAddItem={handleNewSOItem}
          onChangeItem={handleChangeItem}
          onRemoveItem={handleRemoveItem}
        />
        <div className="flex mt-6 justify-between items-end gap-3">
          <div className="flex gap-3">
            <ConfirmButton
              message="Deseja começar um novo orçamento do zero?"
              title="Resetar"
              variant={"destructive"}
              onConfirm={() => console.log('reset')}>
              Resetar
            </ConfirmButton>
            <ConfirmButton
              message="Deseja começar um novo orçamento para a mesma pessoa e veículo?"
              title="Duplicar"
              variant={"outline"}
              onConfirm={onDuplicateClick}>
              Duplicar
            </ConfirmButton>
          </div>
          <div className="flex gap-4">
            {service_order_items.length > 0 && <><Modal 
              trigger={<Button onClick={handleOnSave} variant="outline"><File size={18} className="mr-2"/>PDF</Button>}
              title='Orçamento'
              subtitle='Envie ou imprima para seu cliente'
              className="min-h-[calc(100vh-180px)]"
              async={true}>
                <PDFViewer className="w-full min-h-[calc(100vh-180px)]">
                  <ServiceOrderPDF data={{customer, vehicle, service_order_items, status}}/>
                </PDFViewer>
            </Modal>
            <PDFDownloadLink fileName={`${vehicle.model} ${customer.name} `} document={<ServiceOrderPDF data={{customer, vehicle, service_order_items, status}}/>}>
              <Button variant={'outline'}>
                <Save size={18} className="mr-2"/>Download
              </Button>
            </PDFDownloadLink>
            </>}
            <Button type="submit">
              <Save size={18} className="mr-2"/>Salvar
            </Button>
          </div>
        </div>
      </div>
      </form>
    </FormProvider>
  );
}

export default ServiceOrderPage;