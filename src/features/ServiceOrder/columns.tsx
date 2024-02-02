import { ColumnDef } from "@tanstack/react-table"
import { ServiceOrderItem } from "./types"
import { currencyFormat } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const TAG_BADGE_COLORS = {
  nova: "bg-amber-400",
  recuperada: "bg-gray-400",
  funilaria: "bg-blue-400",
  pintura: "bg-purple-400"
}

export const columns: ColumnDef<ServiceOrderItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "tag",
    header: "Tag",
    cell: ({row}) => <Badge className={`${TAG_BADGE_COLORS[row.getValue("tag")]} shadow-none`}>{row.getValue("tag")}</Badge>
  },
  {
    accessorKey: "description",
    header: "Item",
  },
  // {
  //   accessorKey: "type",
  //   header: "Tipo",
  // },
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
  // {
  //   accessorKey: "insurance_coverage",
  //   header: () => <div className="text-right">Seguro</div>,
  //   cell: ({row}) => <div className="text-right">{currencyFormat(row.getValue("insurance_coverage"))}</div>
  // },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({row}) => {
      const finalValue = (Number.parseFloat(row.getValue("quantity")) * Number.parseFloat(row.getValue("value"))) - Number.parseFloat(row.getValue("discount"))
      return <div className="text-right">{currencyFormat(finalValue, "currency")}</div>
    }
  }
]