import { BADGE_COLORS } from "@/data/constants/colors"
import { currencyFormat } from "@/lib/utils"
import { ServiceOrderItem } from "@/pages/ServiceOrder/types"


interface ServiceOrderListProps {
    data: ServiceOrderItem[]
}

export default function ServiceOrderList({data}: ServiceOrderListProps) {
  return (
    <ol className="relative flex border m-[-17px] flex-col p-4 gap-1 mt-4 flex-1">
        <div className="overflow-y-scroll max-h-[calc(100vh-320px)] flex-1">
        {data.map((item) => (
            <ServiceOrderListItem item={item}/>
        ))}
        </div>
        <span className="w-full h-[70px] pointer-events-none absolute bottom-0 left-0 bg-gradient-to-t from-white"/>
    </ol>
  )
}

function ServiceOrderListItem({item}: {item: ServiceOrderItem}){
    return (
        <li className="flex gap-2 py-4 rounded-md pr-4 hover:bg-zinc-100">
            <span className={`w-[10px] h-[10px] ml-4 mt-[6px] ${BADGE_COLORS[item.type]} rounded-full`} />
            <div className="flex-1">
                <h1 className="font-medium">{item.description}</h1>
                <h1 className="text-slate-500">{item.quantity}x {currencyFormat(item.value, "currency")}</h1>
            </div>
            <div className="text-right">
                <p className="font-medium">{currencyFormat((item.value * item.quantity) - item.discount, "currency")}</p>
                {(item.discount > 0) && <p className="text-md text-slate-500 line-through">{currencyFormat(item.value * item.quantity, "currency")}</p>}
            </div>
        </li>
    )
}