// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type ServiceOrder = {
    id: string
    status: "pending" | "waiting_approval" | "approved" | "waiting_start" | "doing" | "done" | "paused"
    created_at: string,
    last_saved_at: string,
    customer: any,
    vehicle: any,
    items: ServiceOrderItem[]
}

export type ServiceOrderItem = {
    id: string
    tag: string
    description: string,
    type: "part" | "service"
    quantity: number,
    value: number,
    discount: number,
    insurance_coverage: number,
    total: number
}