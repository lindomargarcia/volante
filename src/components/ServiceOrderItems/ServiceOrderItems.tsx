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
import { Trash2Icon } from "lucide-react";

interface ServiceOrderItemProps {
    data: ServiceOrderItem[];
    onAddItem: (newItem: ServiceOrderItem) => Promise<void>;
    onChangeItem: (item: ServiceOrderItem) => void
    onRemoveItem: (item: ServiceOrderItem) => void
}

const defaultServiceOrder: ServiceOrderItem = {
    description: "", value: 0, discount: 0, quantity: 1, id: "", type: "BODYWORK", insurance_coverage: 0, total: 0
};

const ServiceOrderItems = ({ data, onAddItem, onChangeItem, onRemoveItem }: ServiceOrderItemProps) => {
    const { subtotal, totalPrice, totalDiscountPrice, totalPartsPrice, totalServicesPrice } = useSOPrices(data);

    const onSubmit = async (item: ServiceOrderItem) => {
        item.id = crypto.randomUUID();
        await onAddItem(item);
    };

    return (
        <Card className="rounded-lg p-4 flex-1 flex flex-col">
            <ServiceOrderItems.Form onSubmit={onSubmit} />
            <ul className="flex text-sm font-bold mt-6 text-right">
                <li className="flex-1 text-left">Descrição</li>
                <li className="w-[62px]">Qtd.</li>
                <li className="w-[94px]">Valor</li>
                <li className="w-[70px]">Desc.</li>
                <li className="w-[180px]">Total</li>
            </ul>
            <ServiceOrderItems.List data={data} renderItem={item => (
                <ServiceOrderItems.ListItem key={item.id} item={item} onChange={onChangeItem} onDelete={onRemoveItem}/>
            )} />
            <ServiceOrderItems.Footer
                subtotal={subtotal}
                total={totalPrice}
                parts={totalPartsPrice}
                services={totalServicesPrice}
                discount={totalDiscountPrice}
            />
        </Card>
    );
};

ServiceOrderItems.Form = ({ onSubmit }: { onSubmit: (data: ServiceOrderItem) => void }) => {
    const form = useForm<ServiceOrderItem>({ defaultValues: defaultServiceOrder });
    const { data: carServices } = useQuery<any>({
        queryKey: ['car-services'],
        queryFn: getCarServicesAPI,
        refetchOnWindowFocus: false,
    });

    const resetForm = () => form.reset(defaultServiceOrder);

    const handleOnSubmit = (data: ServiceOrderItem) => {
        onSubmit(data);
        resetForm();
        form.setFocus("description");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="flex items-end gap-3">
                <FormInput form={form} name="description" label="Descrição" className="flex-1">
                    {field => <Input placeholder="Digite aqui..." className="flex-1 min-w-[200px]" {...field} />}
                </FormInput>
                <FormSelect
                    label="Tipo"
                    name="type"
                    form={form}
                    options={carServices || []}
                    placeholder="Selecione..."
                    className="w-[150px]"
                />
                <FormInput form={form} name="quantity" label="Qtd.">
                    {field => <Input placeholder="1" type="number" className="w-[70px]" {...field} />}
                </FormInput>
                <MoneyInput form={form} label="Valor" name="value" placeholder="R$ 0,00" className="w-[100px]" />
                <MoneyInput form={form} label="Desconto" name="discount" placeholder="R$ 0,00" className="w-[100px]" />
                <Button type="submit">+</Button>
            </form>
        </Form>
    );
};

interface ServiceOrderListProps {
    data: ServiceOrderItem[];
    renderItem: (item: ServiceOrderItem) => ReactNode;
}

ServiceOrderItems.List = ({ data, renderItem }: ServiceOrderListProps) => (
    <ol className="relative flex border m-[-17px] flex-col p-4 mt-4 flex-1 select-none">
        <div className="overflow-y-scroll max-h-[calc(100vh-420px)] flex-1">
            {data.map(renderItem)}
        </div>
        <span className="w-full h-[80px] pointer-events-none absolute bottom-0 left-0 bg-gradient-to-t from-white" />
    </ol>
);

ServiceOrderItems.ListItem = ({ item, onChange, onDelete }: { item: ServiceOrderItem, onChange: (item: ServiceOrderItem) => void, onDelete: (item: ServiceOrderItem) => void }) => {
    
    const handleOnChange = (fieldName: keyof ServiceOrderItem, value: any) => {
        let newData: any = {...item}
        newData[fieldName] = value
        onChange(newData)
    }
    
    return (
    <li className="flex gap-2 py-2 rounded-md pr-4 hover:bg-zinc-100">
        <span className={`w-[10px] h-[10px] ml-4 mt-[6px] ${BADGE_COLORS[item.type]} rounded-full`} />
        <div className="flex-1">
            <h1 className="font-medium">{item.description}</h1>
            {/* <h1 className="text-slate-500">
                Aqui caso haja algum detalhe
            </h1> */}
        </div>
        <div className="flex-1 flex items-center justify-end gap-2 mr-4">
            <input
                className="font-medium text-right h-full w-[62px] px-2 bg-transparent rounded"
                type="currency"
                value={item.quantity}
                min={1}
                onChange={(e) => handleOnChange('quantity', e.target.value)}
            />
            <p className="font-medium w-[8px]">
                x
            </p>
            <input
                className="font-medium text-right h-full w-[80px] px-2 bg-transparent rounded"
                type="currency"
                min={0}
                value={item.value}
                step="0.01" 
                onChange={(e) => handleOnChange('value', e.target.value)}
            />
            <input
                className="font-medium text-right h-full w-[62px] px-2 bg-transparent rounded"
                type="currency"
                value={item.discount}
                min={0}
                onChange={(e) => handleOnChange('discount', e.target.value)}
            />
        </div>
        <div className="text-right w-[140px] flex flex-col justify-center">
            <p className="font-medium" id="value">
                {currencyFormat((item.value * item.quantity) - item.discount, "currency")}
            </p>
            {item.discount > 0 && (
                <p className="text-md text-slate-500 line-through">
                    {currencyFormat(item.value * item.quantity, "currency")}
                </p>
            )}
        </div>
        <div className="flex items-center align-middle">
            <Trash2Icon size={20} 
                className="opacity-0 stroke-red-500  h-full hover:opacity-100 active:scale-90"
                onClick={() => onDelete(item)}
                />
        </div>
    </li>
)};

ServiceOrderItems.Footer = ({ total, subtotal, parts, services, discount }: { total: number; subtotal: number; parts: number; services: number; discount: number }) => (
    <div className="flex justify-between pl-3 pr-3 mt-8">
        <span className="flex flex-1 gap-8">
            <PriceTag id='total-price' label='Subotal' value={currencyFormat(subtotal, "currency")}/>
            <PriceTag id='discounts-price' label='Descontos' value={currencyFormat(discount, "currency")} />            
        </span>
        <span className="flex gap-8 text-right">
            <PriceTag id='pieces-price' label='Peças' value={currencyFormat(parts, "currency")} />
            <PriceTag id='services-price' label='Serviços' value={currencyFormat(services, "currency")} />
            <PriceTag id='total-price' label='Total' value={currencyFormat(total, "currency")}/>
        </span>
    </div>
);

export default ServiceOrderItems;