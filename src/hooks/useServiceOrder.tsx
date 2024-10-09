import { DEFAULT_SELECTION, ICarSelectionValue } from "@/components/CarPartsSelector/types";
import { CustomerSchema, DEFAULT_CUSTOMER_VALUE } from "@/components/FormSheet/Customer/schema";
import { DEFAULT_VEHICLE_VALUES, VehicleSchema } from "@/components/FormSheet/Vehicle/schema";
import { STATUS_SERVICE_ORDER, ServiceOrderItem } from "@/pages/ServiceOrder/types";
import { create } from "zustand";
import { nanoid } from 'nanoid/non-secure'

interface ServiceOrderStore {
  id: any,
  status: STATUS_SERVICE_ORDER,
  customer: any,
  vehicle: any,
  items: ServiceOrderItem[],
  car_map: any,
  setId: (id: string) => Promise<any>,
  setStatus: (status: STATUS_SERVICE_ORDER | string) => Promise<any>,
  setCustomer: (customer: CustomerSchema) => Promise<any>,
  setVehicle: (vehicle: VehicleSchema) => Promise<any>,
  setItems: (items: ServiceOrderItem[]) => Promise<any>,
  setCarMap: (car_map: ICarSelectionValue) => Promise<any>,
}

export const useServiceOrderStore = create<ServiceOrderStore>((set: any) => ({
    id: nanoid(),
    status: STATUS_SERVICE_ORDER.PENDING,
    customer: DEFAULT_CUSTOMER_VALUE,
    vehicle: DEFAULT_VEHICLE_VALUES,
    items: [],
    car_map: DEFAULT_SELECTION,
    setId: (id: string) => set(() => ({id})),
    setStatus: (status: STATUS_SERVICE_ORDER | string) => set(() => ({status})),
    setCustomer: (customer: CustomerSchema) => set(() => ({customer})),
    setVehicle: (vehicle: VehicleSchema) => set(() => ({vehicle})),
    setItems: (items: ServiceOrderItem[]) => set(() => ({items})),
    setCarMap: (car_map: ICarSelectionValue) => set(() => ({car_map})),
  }))