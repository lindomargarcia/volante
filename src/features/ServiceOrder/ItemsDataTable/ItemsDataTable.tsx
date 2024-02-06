import { DataTable } from "@/components/DataTable/DataTable";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import PriceTag from "@/components/ui/priceTag";
import { useForm } from "react-hook-form";
import { ServiceOrder, ServiceOrderItem } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putServiceOrderItem } from "@/data/ServiceOrder";
import { FormInput, FormSelect } from "@/components/FormInput";
import { Form } from "@/components/ui/form";

interface ItemsDataTableProps {
    data: ServiceOrderItem[]
}
 
const ItemsDataTable = ({data}: ItemsDataTableProps) => {
    const form = useForm({ defaultValues:{ description: "", value: "", discount: "", quantity: 1} })
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

    const onSubmit = (data: ServiceOrderItem) => {
        const {description, value, tag, discount, quantity} = data
        putServiceOrderItemFn({
            id: crypto.randomUUID(),
            description,
            value: value || 0,
            quantity,
            discount: discount || 0,
            insurance_coverage: 0,
            total: (value * quantity) - discount,
            type: 'part',
            tag
        })
        form.setFocus("description");
        form.setValue("description", "")
        form.setValue("value", "")
        form.setValue("discount", "")
        form.setValue("quantity", 1)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-3">
            <FormSelect label="Tag" name="tag" form={form} options={['funilaria', 'pintura']} placeholder="Selecione..." className="w-[150px]" direction={"col"}/>
                <FormInput form={form} name="description" label="Descrição" placeholder="Digite aqui..." key={"description"} direction={"col"} className="flex-1 min-w-[200px]"/>
                <FormInput form={form} name="quantity" label="Qtd." placeholder="1" type="number" key={"quantity"} direction={"col"} className="w-[60px] last:text-right"/>
                <FormInput form={form} name="value" label="Valor" placeholder="R$0,00" key={"value"} direction={"col"} className="w-[100px] last:text-right"/>
                <FormInput form={form} name="discount" label="Desconto" placeholder="R$0,00" key={"discount"} direction={"col"} className="w-[100px] last:text-right"/>
                <Button type="submit">Adicionar</Button>
            </form>

            <DataTable columns={columns} data={data || []} className={"mt-4 mb-4 flex-1 overflow-y-scroll min-h-[500px]"}/>
            
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
        </Form>
    );
}
 
export default ItemsDataTable;