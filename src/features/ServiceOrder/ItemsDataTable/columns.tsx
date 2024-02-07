import { ColumnDef } from "@tanstack/react-table"
import { ServiceOrderItem } from "../types"
import { currencyFormat } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export enum CAR_SERVICES {
  BODYWORK = "Funilaria",
  PAINTING = "Pintura",
  PARTS = "Peças",
  AIR_CONDITIONING = "Ar Condicionado",
  TIRE_REPAIR = "Borracharia",
  ELECTRICAL = "Elétrica",
  AESTHETICS = "Estética",
  DENT_REPAIR = "Martelinho",
  MECHANICAL = "Mecânica",
  OVERHAUL = "Revisão",
  UPHOLSTERY = "Tapeçaria",
  GLASSWORK = "Vidraçaria",
  // BATTERY_REPLACEMENT = "Troca de Bateria",
  // BRAKE_SERVICE = "Serviço de Freio",
  // ENGINE_OVERHAUL = "Revisão de Motor",
  // OIL_AND_FILTER_CHANGE = "Troca de Óleo e Filtros",
  // SUSPENSION_REPAIR = "Reparo de Suspensão",
  // TRANSMISSION_REPAIR = "Reparo de Transmissão",
  // WINDSHIELD_REPAIR = "Reparo de Para-brisa",
  // ALIGNMENT_AND_BALANCING = "Alinhamento e Balanceamento"
}

export const columns: ColumnDef<ServiceOrderItem>[] = [
  {
    accessorKey: "tag",
    header: "Tag",
    cell: ({row}) => <Badge>{row.getValue("tag")}</Badge>
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