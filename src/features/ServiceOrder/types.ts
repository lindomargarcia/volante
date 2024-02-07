// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { CustomerSheetSchema } from "@/components/CustomerSheet/schema"
import { VehicleSheetSchema } from "@/components/VehicleSheet/schema"

export type ServiceOrder = {
    id: string
    status: "pending" | "waiting_approval" | "approved" | "waiting_start" | "doing" | "done" | "paused"
    created_at: string,
    last_saved_at: string,
    insurance_company?: string,
    duration_quantity: number,
    duration_type: "hour" | "day" | "week" | "month" | "year",
    images: string[]
    customer: CustomerSheetSchema,
    vehicle: VehicleSheetSchema,
    items: ServiceOrderItem[] | []
}

export type ServiceOrderItem = {
    id: string
    type: string
    description: string,
    quantity: number,
    value: number,
    discount: number,
    insurance_coverage: number,
    total: number
}

export type ServiceOrderVehicle = {
    plate: string,
    description?: string,
    brand: string,
    model: string,
    year: string
}