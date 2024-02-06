import { DataTable } from "@/components/DataTable/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { columns } from "../columns";
import PriceTag from "@/components/ui/priceTag";
import { useForm } from "react-hook-form";
import { ServiceOrder, ServiceOrderItem } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putServiceOrderItem } from "@/data/ServiceOrder";

interface ItemsDataTableProps {
    data: ServiceOrderItem[]
}
 
const ItemsDataTable = ({data}: ItemsDataTableProps) => {
    const {register, handleSubmit} = useForm()
    const queryClient = useQueryClient()
    const { mutateAsync: putServiceOrderItemFn } = useMutation({
        mutationFn: putServiceOrderItem,
        onSuccess: (_data, variables: ServiceOrderItem) => {
            queryClient.setQueryData(['service-order'], (data: ServiceOrder) => {
                const newSO = {...data}
                newSO.items = [...newSO.items, variables]
                return newSO
              })
        }
    })

    const onSubmit = ({description, value}: any) => {
        putServiceOrderItemFn({
            id: crypto.randomUUID(),
            description,
            value: value || 0,
            quantity: 1,
            discount: 0,
            insurance_coverage: 0,
            total: 2,
            type: 'part',
            tag: 'funilaria'
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-3">
            <span className="flex-1">
                <Label htmlFor="item">Item</Label>
                <Input id="description" placeholder="Digite aqui..." {...register("description")} />
            </span>
            <span>
                <Label htmlFor="price">Valor</Label>
                <Input id="price" placeholder="0,00" {...register("value")}/>
            </span>
            <Button type="submit">Adicionar</Button>
            </form>

            <DataTable columns={columns} data={data || []} className={"mt-4 mb-4 flex-1 overflow-y-scroll"}/>
            
            <div className="flex justify-between">
            <span className="flex flex-1 gap-8">
                <PriceTag id='pieces-price' label='Peças' value='R$0,00' />
                <PriceTag id='services-price' label='Serviços' value='R$0,00' />
                <PriceTag id='discounts-price' label='Descontos' value='R$0,00' />
            </span>
            <span className="flex gap-8">
                {/* <PriceTag id='insurance-price' label='Seguro' value='-R$0,00' className="text-right" /> */}
                <PriceTag id='total-price' label='Total' value='R$0,00' className="text-right" />
            </span>
            </div>
        </>
    );
}
 
export default ItemsDataTable;