import { DEFAULT_SELECTION, ICarSelectionValue } from "@/components/CarPartsSelector/types";
import { CustomerSchema, DEFAULT_CUSTOMER_VALUE } from "@/components/FormSheet/Customer/schema";
import { DEFAULT_VEHICLE_VALUES, VehicleSchema } from "@/components/FormSheet/Vehicle/schema";
import { STATUS_SERVICE_ORDER, ServiceOrderItem } from "@/pages/ServiceOrder/types";
import { create } from "zustand";

export const useServiceOrderStore = create((set: any) => ({
    status: STATUS_SERVICE_ORDER.PENDING,
    customer: DEFAULT_CUSTOMER_VALUE,
    vehicle: DEFAULT_VEHICLE_VALUES,
    items: [],
    car_map: DEFAULT_SELECTION,
    setStatus: (status: STATUS_SERVICE_ORDER | string) => set(() => ({status})),
    setCustomer: (customer: CustomerSchema) => set(() => ({customer})),
    setVehicle: (vehicle: VehicleSchema) => set(() => ({vehicle})),
    setItems: (items: ServiceOrderItem[]) => set(() => ({items})),
    setCarMap: (car_map: ICarSelectionValue) => set(() => ({car_map})),
    addItem: (newItem: ServiceOrderItem) => set((state: any) => ({items: [...state.items, newItem]}))
  }))