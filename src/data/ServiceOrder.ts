import { CustomerSchema, DEFAULT_CUSTOMER_VALUE } from "@/components/FormSheet/Customer/schema"
import { DEFAULT_VEHICLE_VALUES, VehicleSchema } from "@/components/FormSheet/Vehicle/schema"
import { STATUS_SERVICE_ORDER, ServiceOrder, ServiceOrderItem } from "@/pages/ServiceOrder/types"

export async function getServiceOrderAPI(): Promise<ServiceOrder>{
    return {
        id: crypto.randomUUID(),
        status: STATUS_SERVICE_ORDER.PENDING,
        created_at: new Date().toJSON(),
        last_saved_at: new Date().toJSON(),
        customer: DEFAULT_CUSTOMER_VALUE,
        vehicle: DEFAULT_VEHICLE_VALUES,
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