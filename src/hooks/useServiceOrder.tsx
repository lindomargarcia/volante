import { DEFAULT_SELECTION, ICarSelectionValue } from "@/components/CarPartsSelector/types";
import { CustomerSchema, DEFAULT_CUSTOMER_VALUE } from "@/components/FormSheet/Customer/schema";
import { DEFAULT_VEHICLE_VALUES, VehicleSchema } from "@/components/FormSheet/Vehicle/schema";
import { STATUS_SERVICE_ORDER, ServiceOrder, ServiceOrderItem } from "@/pages/ServiceOrder/types";
import { create } from "zustand";
import { nanoid } from 'nanoid/non-secure'

interface ServiceOrderStore {
  id: any,
  status: STATUS_SERVICE_ORDER,
  customer: any,
  vehicle: any,
  service_order_items: ServiceOrderItem[],
  car_map: any,
  setId: (id: string) => Promise<any>,
  setStatus: (status: STATUS_SERVICE_ORDER | string) => Promise<any>,
  setCustomer: (customer: CustomerSchema) => Promise<any>,
  setVehicle: (vehicle: VehicleSchema) => Promise<any>,
  setItems: (service_order_items: ServiceOrderItem[]) => Promise<any>,
  setCarMap: (car_map: ICarSelectionValue) => Promise<any>,
  setServiceOrder: (serviceOrder:ServiceOrder) => Promise<any>,
  reset:() => Promise<any>
}

export const useServiceOrderStore = create<ServiceOrderStore>((set: any) => ({
    id: nanoid(),
    status: STATUS_SERVICE_ORDER.PENDING,
    customer: DEFAULT_CUSTOMER_VALUE,
    vehicle: DEFAULT_VEHICLE_VALUES,
    service_order_items: [],
    car_map: DEFAULT_SELECTION,
    setId: (id: string) => set(() => ({id})),
    setStatus: (status: STATUS_SERVICE_ORDER | string) => set(() => ({status})),
    setCustomer: (customer: CustomerSchema) => set(() => ({customer})),
    setVehicle: (vehicle: VehicleSchema) => set(() => ({vehicle})),
    setItems: (service_order_items: ServiceOrderItem[]) => set(() => ({service_order_items})),
    setCarMap: (car_map: ICarSelectionValue) => set(() => ({car_map})),
    setServiceOrder: (serviceOrder) => set(() => ({...serviceOrder})),
    reset: () => set(() => ({id: nanoid(),status: STATUS_SERVICE_ORDER.PENDING,customer: DEFAULT_CUSTOMER_VALUE,vehicle: DEFAULT_VEHICLE_VALUES,service_order_items: [],car_map: DEFAULT_SELECTION,}))
  }))