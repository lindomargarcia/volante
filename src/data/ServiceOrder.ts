import { CustomerSchema, defaultCustomerValues } from "@/components/FormSheet/Customer/schema"
import { VehicleSchema, defaultVehicleValues } from "@/components/FormSheet/Vehicle/schema"
import { ServiceOrder, ServiceOrderItem } from "@/features/ServiceOrder/types"

export async function getServiceOrderAPI(): Promise<ServiceOrder>{
    return {
        id: crypto.randomUUID(),
        status: "pending",
        created_at: new Date().toJSON(),
        last_saved_at: new Date().toJSON(),
        customer: defaultCustomerValues,
        vehicle: defaultVehicleValues,
        images: [],
        insurance_company: '',
        duration_quantity: 0,
        duration_type: 'day',
        items: []
    }
}

export async function putServiceOrderItemAPI(_data: ServiceOrderItem){
    return 
}

export async function putServiceOrderCustomerAPI(_data: CustomerSchema){
    return 
}

export async function putServiceOrderVehicleAPI(_data: VehicleSchema){
    return 
}

export async function putServiceOrderAPI(_data?: ServiceOrder){
    return 
}