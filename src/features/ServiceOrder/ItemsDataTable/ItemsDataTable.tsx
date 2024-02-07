import { DataTable } from "@/components/DataTable/DataTable";
import { Button } from "@/components/ui/button";
import { CAR_SERVICES, columns } from "./columns";
import PriceTag from "@/components/ui/priceTag";
import { useForm } from "react-hook-form";
import { ServiceOrder, ServiceOrderItem } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putServiceOrderItemAPI } from "@/data/ServiceOrder";
import { FormInput, FormSelect } from "@/components/FormInput";
import { Form } from "@/components/ui/form";
import { currencyFormat } from "@/lib/utils";
import useServiceOrder from "@/hooks/useSerivceOrder";

interface ItemsDataTableProps {
    data: ServiceOrderItem[]
}

const defaultValuesServiceOrder: ServiceOrderItem = {
    description: "", value: 0, discount: 0, quantity: 1,id: "", tag: CAR_SERVICES.BODYWORK, insurance_coverage: 0, total: 0
}

const ItemsDataTable = ({data}: ItemsDataTableProps) => {
    const { updateValues, total, total_discount, total_parts, total_services } = useServiceOrder()
    const form = useForm<ServiceOrderItem>({ defaultValues: defaultValuesServiceOrder})
    const queryClient = useQueryClient()

    const { mutateAsync: putServiceOrderItemFn } = useMutation({
        mutationFn: putServiceOrderItemAPI,
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
        const totalValue: number = (value * quantity) - discount

        putServiceOrderItemFn({
            id: crypto.randomUUID(),
            description,
            value: value || 0,
            quantity,
            discount: discount || 0,
            insurance_coverage: 0,
            total: totalValue,
            tag
        })
        
        updateValues(data)
        resetBasicFields()
    }

    const resetBasicFields = () => {
        form.setFocus("description");
        form.setValue("description", "")
        form.setValue("value", 0)
        form.setValue("discount", 0)
        form.setValue("quantity", 1)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-3">
            <FormSelect label="Tag" name="tag" form={form} options={Object.values(CAR_SERVICES)} placeholder="Selecione..." containerClassName="w-[150px]" direction={"col"}/>
                <FormInput form={form} name="description" label="Descrição" placeholder="Digite aqui..." key={"description"} direction={"col"} containerClassName="flex-1 min-w-[200px]"/>
                <FormInput form={form} name="quantity" label="Qtd." placeholder="1" type="number" key={"quantity"} direction={"col"} containerClassName="w-[70px]"/>
                <FormInput form={form} name="value" label="Valor" placeholder="R$0,00" key={"value"} direction={"col"} containerClassName="w-[100px]" className="last:text-right"/>
                <FormInput form={form} name="discount" label="Desconto" placeholder="R$0,00" key={"discount"} direction={"col"} containerClassName="w-[100px]" className="last:text-right"/>
                <Button type="submit">Adicionar</Button>
            </form>

            <DataTable columns={columns} data={data || []} className={"mt-4 mb-4 flex-1 overflow-y-scroll min-h-[500px]"}/>
            
            <div className="flex justify-between">
                <span className="flex flex-1 gap-8">
                    <PriceTag id='pieces-price' label='Peças' value={currencyFormat(total_parts, "currency")} />
                    <PriceTag id='services-price' label='Serviços' value={currencyFormat(total_services, "currency")} />
                    <PriceTag id='discounts-price' label='Descontos' value={currencyFormat(total_discount, "currency")} />
                </span>
                <span className="flex gap-8">
                    <PriceTag id='total-price' label='Total' value={currencyFormat(total, "currency")} className="text-right" />
                </span>
            </div>
        </Form>
    );
}
 
export default ItemsDataTable;