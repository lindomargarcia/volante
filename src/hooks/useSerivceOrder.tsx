import { CAR_SERVICES } from "@/features/ServiceOrder/ItemsDataTable/columns"
import { ServiceOrderItem } from "@/features/ServiceOrder/types"
import { useState } from "react"

const useServiceOrder = () => {
    const [total, setTotal] = useState<number>(0)
    const [total_services, setServices] = useState<number>(0)
    const [total_parts, setParts] = useState<number>(0)
    const [total_discount, setDiscounts] = useState<number>(0)

    const updateValues = ({value, quantity, discount, tag}: ServiceOrderItem) => {
        const totalValue: number = (value * quantity) - discount

        setTotal(total + totalValue)
        setDiscounts(total_discount + Number(discount))

        if(tag === CAR_SERVICES.PARTS){
            setParts(total_parts + (value * quantity))
        }else{
            setServices(total_services + (value * quantity))
        }
    }

    return { total, total_parts, total_services, total_discount, updateValues };
}
 
export default useServiceOrder;