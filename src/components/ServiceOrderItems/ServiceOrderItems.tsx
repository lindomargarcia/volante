import { Button } from "@/components/ui/button";
import PriceTag from "@/components/ui/priceTag";
import { useForm } from "react-hook-form";
import { ServiceOrderItem } from "../../pages/ServiceOrder/types";
import { FormInput, FormSelect } from "@/components/FormInput";
import { Form } from "@/components/ui/form";
import { currencyFormat } from "@/lib/utils";
import useSOPrices from "@/hooks/useSOPrices";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import MoneyInput from "../ui/money-input";
import { useQuery } from "@tanstack/react-query";
import { getCarServicesAPI } from "@/data/api/CarServicesAPI";
import { BADGE_COLORS } from "@/data/constants/colors";
import { ReactNode } from "react";

interface ServiceOrderItemProps {
    data: ServiceOrderItem[]
    onAddItem: (newItem: ServiceOrderItem) => Promise<any>
}

const defaultServiceOrder: ServiceOrderItem = {
    description: "", value: 0, discount: 0, quantity: 1, id: "", type: "BODYWORK", insurance_coverage: 0, total: 0
}

const ServiceOrderItems = ({data, onAddItem}: ServiceOrderItemProps) => {
    const { updatePrices, totalPrice, totalDiscountPrice, totalPartsPrice, totalServicesPrice } = useSOPrices()

    const onSubmit = (data: ServiceOrderItem) => {
        data.id = crypto.randomUUID()
        onAddItem(data).then(() => {
            updatePrices(data)
        })
    }

    return (
        <Card className="rounded-lg p-4 flex-1 flex flex-col">
            <ServiceOrderItems.Form onSubmit={onSubmit}/>
            <ServiceOrderItems.List data={data} onRender={(item) => 
                <ServiceOrderItems.ListItem key={item.id} item={item}/>
            }/>
            <ServiceOrderItems.Footer total={totalPrice} parts={totalPartsPrice} services={totalServicesPrice} discount={totalDiscountPrice}/>
        </Card>
    );
}

ServiceOrderItems.Form = ({onSubmit}: {onSubmit: (data: ServiceOrderItem) => void}) => {
    const form = useForm<ServiceOrderItem>({ defaultValues: defaultServiceOrder})
    const {data: carServices} = useQuery<any>({queryKey: ['car-services'],queryFn: getCarServicesAPI,refetchOnWindowFocus: false})

    const resetForm = () => {
        form.setFocus("description");
        form.setValue("description", "")
        form.setValue("value", 0)
        form.setValue("discount", 0)
        form.setValue("quantity", 1)
    }

    const handleOnSubmit = (data: ServiceOrderItem) => {
        onSubmit(data)
        resetForm()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="flex items-end gap-3">
                <FormInput form={form} name="description" label="Descrição" className="flex-1">
                    {field => <Input placeholder="Digite aqui..." className="flex-1 min-w-[200px]" {...field}/>}
                </FormInput>
                <FormSelect label="Tipo" name="type" form={form} options={carServices || []} placeholder="Selecione..." className="w-[150px]"/>
                <FormInput form={form} name="quantity" label="Qtd." >
                    {field => <Input placeholder="1" type="number" className="w-[70px]" {...field}/>}
                </FormInput>
                <MoneyInput form={form} label="Valor" name="value" placeholder="R$ 0,00" className="w-[100px]"/>
                <MoneyInput form={form} label="Desconto" name="discount" placeholder="R$ 0,00" className="w-[100px]"/>
                <Button type="submit">+</Button>
            </form>
        </Form>
    )
}

interface ServiceOrderListProps {
    data: ServiceOrderItem[],
    onRender: (data: ServiceOrderItem) => ReactNode
}

 ServiceOrderItems.List = ({data, onRender}: ServiceOrderListProps) => {
  return (
    <ol className="relative flex border m-[-17px] flex-col p-4 mt-4 flex-1">
        <div className="overflow-y-scroll max-h-[calc(100vh-420px)] flex-1">
            {data.map((item) => (
                onRender(item)
            ))}
        </div>
        <span className="w-full h-[80px] pointer-events-none absolute bottom-0 left-0 bg-gradient-to-t from-white"/>
    </ol>
  )
}

ServiceOrderItems.ListItem = ({item}: {item: ServiceOrderItem}) => {
    return (
        <li className="flex gap-2 py-2 rounded-md pr-4 hover:bg-zinc-100">
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

ServiceOrderItems.Footer = ({total = 0, parts = 0, services = 0, discount = 0}) => {
    return (
        <div className="flex justify-between pl-3 pr-3 mt-8">
            <span className="flex flex-1 gap-8">
                <PriceTag id='pieces-price' label='Peças' value={currencyFormat(parts, "currency")} />
                <PriceTag id='services-price' label='Serviços' value={currencyFormat(services, "currency")} />
                <PriceTag id='discounts-price' label='Descontos' value={currencyFormat(discount, "currency")} />
            </span>
            <span className="flex gap-8">
                <PriceTag id='total-price' label='Total' value={currencyFormat(total, "currency")} className="text-right" />
            </span>
        </div>
    )
}
 
export default ServiceOrderItems;