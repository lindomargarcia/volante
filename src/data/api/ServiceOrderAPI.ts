import { ServiceOrder } from "@/pages/ServiceOrder/types"

// export async function getServiceOrderAPI(): Promise<ServiceOrder>{
//     return {
//         id: crypto.randomUUID(),
//         status: STATUS_SERVICE_ORDER.PENDING,
//         created_at: new Date().toJSON(),
//         last_saved_at: new Date().toJSON(),
//         customer: DEFAULT_CUSTOMER_VALUE,
//         vehicle: DEFAULT_VEHICLE_VALUES,
//         images: [],
//         insurance_company: '',
//         duration_quantity: 0,
//         duration_type: 'day',
//         items: []
//     }
// }

export const getServiceOrderAPI = (searchValue = '', page = 1) => fetch('http://localhost:2000/service_orders/search?searchValue=' + searchValue + '&page=' + page).then(res => res.json());

// export async function putServiceOrderItemAPI(data: ServiceOrderItem){
//     return 
// }

// export async function putServiceOrderCustomerAPI(data: CustomerSchema){
//     return 
// }

// export async function putServiceOrderVehicleAPI(_data: VehicleSchema){
//     return 
// }

export async function putServiceOrderAPI(data: Partial<ServiceOrder>){
    return fetch('http://localhost:2000/service_orders', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify({...data})
    }).then(res => res.ok && res.json())
}

export async function deleteServiceOrderItem(id: string){
    return fetch('http://localhost:2000/service_order_items/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': "application/json"
        },
    })
}