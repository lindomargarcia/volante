import { ColumnDef } from "@tanstack/react-table"
import { ServiceOrderItem } from "../../features/ServiceOrder/types"
import { currencyFormat } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const BADGE_COLORS: Record<string, string> = {
  "BODYWORK": "bg-blue-500", 
  "PAINTING": "bg-violet-500",
  "PARTS": "bg-amber-500",
  "AIR_CONDITIONING": "bg-indigo-300",
  "TIRE_REPAIR": "bg-gray-500",
  "ELECTRICAL": "bg-pink-500",
  "AESTHETICS": "bg-pink-400",
  "DENT_REPAIR": "bg-blue-400",
  "MECHANICAL": "bg-green-500",
  "OVERHAUL": "bg-red-400",
  "UPHOLSTERY": "bg-amber-700",
  "GLASSWORK": "bg-blue-300",
  "OTHER": "bg-pink-800"
}

export const columns: ColumnDef<ServiceOrderItem>[] = [
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({row}) => {
      const type: keyof typeof BADGE_COLORS = row.getValue("type");
      return <Badge className={`${BADGE_COLORS[type]} shadow-none`}>{row.getValue("type")}</Badge>
    }
  },
  {
    accessorKey: "description",
    header: "Item",
  },
  {
    accessorKey: "quantity",
    header: "Qtd",
  },
  {
    accessorKey: "value",
    header: () => <div className="text-right">Valor</div>,
    cell: ({row}) => <div className="text-right">{currencyFormat(row.getValue("value"))}</div>
  },
  {
    accessorKey: "discount",
    header: () => <div className="text-right">Desconto</div>,
    cell: ({row}) => <div className="text-right">{currencyFormat(row.getValue("discount"))}</div>
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({row}) => {
      const finalValue = (Number.parseFloat(row.getValue("quantity")) * Number.parseFloat(row.getValue("value"))) - Number.parseFloat(row.getValue("discount"))
      return <div className="text-right">{currencyFormat(finalValue, "currency")}</div>
    }
  }
]