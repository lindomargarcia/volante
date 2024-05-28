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
    CRITICAL = "crítico",
    SEVERE = "grave",
    MODERATE="moderado",
    MINOR = 'leve',
    NEGLIGIBLE = "ignorar",
    // TOTALED = "Perda Total"
}

export const SEVERITY_COLORS:Record<SEVERITY_STATUS,string> = {
    [SEVERITY_STATUS.CRITICAL]: "#ED553B",  // Vermelho
    [SEVERITY_STATUS.SEVERE]: "#F6952F",    // Laranja
    [SEVERITY_STATUS.MODERATE]: "#FFB800",  // Amarelo
    [SEVERITY_STATUS.MINOR]: "#029cdf",     // Azul
    [SEVERITY_STATUS.NEGLIGIBLE]: "#9cdf02" // Verde
};

export enum CAR_ACTIONS {
    DAMAGE = "damage",
    PAINT = "painting",
    POLISH = "polishing",
    FIX = "fixing"
}