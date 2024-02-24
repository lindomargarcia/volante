import { ServiceOrderItem } from "@/features/ServiceOrder/types"
import { useState } from "react"

const useSOPrices = () => {
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [totalServicesPrice, setServicesPrice] = useState<number>(0)
    const [totalPartsPrice, setPartsPrice] = useState<number>(0)
    const [totalDiscountPrice, setDiscounts] = useState<number>(0)

    const updatePrices = ({value, quantity, discount, type}: ServiceOrderItem) => {
        const totalValue: number = (value * quantity) - discount

        setTotalPrice(totalPrice + totalValue)
        setDiscounts(totalDiscountPrice + Number(discount))

        if(type === "PARTS"){
            setPartsPrice(totalPartsPrice + (value * quantity))
        }else{
            setServicesPrice(totalServicesPrice + (value * quantity))
        }
    }

    return { totalPrice, totalPartsPrice, totalServicesPrice, totalDiscountPrice, updatePrices };
}
 
export default useSOPrices;