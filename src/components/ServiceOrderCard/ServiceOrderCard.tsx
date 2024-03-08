import { Button } from "@/components/ui/button";
import PriceTag from "@/components/ui/priceTag";
import { useForm } from "react-hook-form";
import { ServiceOrderItem } from "../../pages/ServiceOrder/types";
import { FormInput, FormSelect } from "@/components/FormInput";
import { Form } from "@/components/ui/form";
import { currencyFormat } from "@/lib/utils";
import useSOPrices from "@/hooks/useSOPrices";
import { Card } from "../ui/card";
import ServiceOrderList from "../ServiceOrderList/ServiceOrderList";

interface ServiceOrderCardProps {
    data: ServiceOrderItem[]
    carServices: any
    onAddItem: (newItem: ServiceOrderItem) => Promise<any>
}

const defaultServiceOrder: ServiceOrderItem = {
    description: "", value: 0, discount: 0, quantity: 1, id: "", type: "BODYWORK", insurance_coverage: 0, total: 0
}

const ServiceOrderCard = ({data, carServices, onAddItem}: ServiceOrderCardProps) => {
    const { updatePrices, totalPrice, totalDiscountPrice, totalPartsPrice, totalServicesPrice } = useSOPrices()
    const form = useForm<ServiceOrderItem>({ defaultValues: defaultServiceOrder})

    const onSubmit = (data: ServiceOrderItem) => {
        data.id = crypto.randomUUID()
        onAddItem(data).then(() => {
            updatePrices(data)
            resetBasicFields()
        })
    }

    const resetBasicFields = () => {
        form.setFocus("description");
        form.setValue("description", "")
        form.setValue("value", 0)
        form.setValue("discount", 0)
        form.setValue("quantity", 1)
    }

    return (
        <Card className="rounded-lg p-4 flex-1 flex flex-col">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-3">
                    <FormInput form={form} name="description" label="Descrição" placeholder="Digite aqui..." key={"description"} direction={"col"} containerClassName="flex-1 min-w-[200px]"/>
                    <FormSelect label="Tipo" name="type" form={form} options={carServices} placeholder="Selecione..." containerClassName="w-[150px]" direction={"col"}/>
                    <FormInput form={form} name="quantity" label="Qtd." placeholder="1" type="number" key={"quantity"} direction={"col"} containerClassName="w-[70px]"/>
                    <FormInput form={form} name="value" label="Valor" placeholder="R$0,00" key={"value"} direction={"col"} containerClassName="w-[100px]" className="last:text-right"/>
                    <FormInput form={form} name="discount" label="Desconto" placeholder="R$0,00" key={"discount"} direction={"col"} containerClassName="w-[100px]" className="last:text-right"/>
                    <Button type="submit">Adicionar</Button>
                </form>

                <ServiceOrderList data={data}/>
                
                <div className="flex justify-between pl-3 pr-3 mt-8">
                    <span className="flex flex-1 gap-8">
                        <PriceTag id='pieces-price' label='Peças' value={currencyFormat(totalPartsPrice, "currency")} />
                        <PriceTag id='services-price' label='Serviços' value={currencyFormat(totalServicesPrice, "currency")} />
                        <PriceTag id='discounts-price' label='Descontos' value={currencyFormat(totalDiscountPrice, "currency")} />
                    </span>
                    <span className="flex gap-8">
                        <PriceTag id='total-price' label='Total' value={currencyFormat(totalPrice, "currency")} className="text-right" />
                    </span>
                </div>
            </Form>
        </Card>
    );
}
 
export default ServiceOrderCard;