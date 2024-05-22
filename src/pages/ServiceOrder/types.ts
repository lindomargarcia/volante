// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { CustomerSchema } from "@/components/FormSheet/Customer/schema"
import { VehicleSchema } from "@/components/FormSheet/Vehicle/schema"

export type ServiceOrder = {
    id: string
    status: STATUS_SERVICE_ORDER,
    created_at: string,
    last_saved_at: string,
    insurance_company?: string,
    duration_quantity: number,
    duration_type: "hour" | "day" | "week" | "month" | "year",
    images: string[]
    customer: CustomerSchema,
    vehicle: VehicleSchema,
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

export enum STATUS_SERVICE_ORDER {
    PENDING = "pending",
    WAITING_APPROVAL = "waiting_approval",
    SCHEDULED = 'scheduled',
    APPROVED = "approved",
    TODO = "todo",
    DOING = "doing",
    READY = "ready",
    DONE = "done",
    BLOCKED = "blocked",
    CANCELLED = "cancelled",
    REJECTED = "rejected"
}

export enum SEVERITY_STATUS {
    NEGLIGIBLE = "ignorar",
    MINOR = 'leve',
    MODERATE="moderado",
    SEVERE = "grave",
    CRITICAL = "crítico",
    // TOTALED = "Perda Total"
}

export enum CAR_ACTIONS {
    DAMAGE = "damage",
    PAINT = "painting",
    POLISH = "polishing",
    FIX = "fixing"
}