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
import { BADGE_COLORS } from "@/data/constants/colors";
import { ReactNode } from "react";
import { Trash2Icon } from "lucide-react";
import { nanoid } from 'nanoid/non-secure'
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import { CAR_SERVICES } from "@/data/constants/utils";
interface ServiceOrderItemProps {
    data: ServiceOrderItem[];
    onAddItem: (newItem: ServiceOrderItem) => Promise<void>;
    onChangeItem: (item: ServiceOrderItem) => void
    onRemoveItem: (item: ServiceOrderItem) => void
}

const ServiceOrderItems = ({ data, onAddItem, onChangeItem, onRemoveItem }: ServiceOrderItemProps) => {
    const { subtotal, totalPrice, totalDiscountPrice, totalPartsPrice, totalServicesPrice } = useSOPrices(data);

    const onSubmit = async (item: ServiceOrderItem) => {
        let newItem = {...item}
        newItem.id = nanoid()
        await onAddItem(newItem);
    };

    return (
        <Card className="rounded-lg p-4 flex-1 flex flex-col">
            <ServiceOrderItems.Form onSubmit={onSubmit} />
            <ul className="flex text-sm font-bold mt-6 text-right">
                <li className="flex-1 text-left">Descrição</li>
                <li className="w-[62px]">Qtd.</li>
                <li className="w-[94px]">Valor</li>
                <li className="w-[70px]">Desc.</li>
                <li className="w-[170px] mr-[68px]">Total</li>
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

const ITEM_ID_LENGTH = 10
const defaultServiceOrder: ServiceOrderItem = {
    id: nanoid(ITEM_ID_LENGTH), description: "", value: 0, discount: 0, quantity: 1, type: "BODYWORK", insurance_coverage: 0, total: 0
 };

ServiceOrderItems.Form = ({ onSubmit }: { onSubmit: (data: ServiceOrderItem) => void }) => {
    const form = useForm<ServiceOrderItem>({ defaultValues: defaultServiceOrder });
    const handleOnSubmit = (data: ServiceOrderItem) => {
        onSubmit(data);
        form.setValue('id', nanoid(ITEM_ID_LENGTH))
        form.setValue('description', '')
        form.setValue('quantity', 0)
        form.setValue('discount', 0)
        form.setValue('value', 0)
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
                    options={CAR_SERVICES || []}
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
    <ol className="relative flex border m-[-17px] flex-col p-2 mt-4 flex-1 select-none">
        <div className="overflow-y-scroll max-h-[calc(100vh-330px)] flex-1">
            {data.map(renderItem)}
        </div>
        {/* <span className="w-full h-[80px] pointer-events-none absolute bottom-0 left-0 bg-gradient-to-t from-white" /> */}
    </ol>
);

ServiceOrderItems.ListItem = ({ item, onChange, onDelete }: { item: ServiceOrderItem, onChange: (item: ServiceOrderItem) => void, onDelete: (item: ServiceOrderItem) => void }) => {
    
    const handleOnChange = (fieldName: keyof ServiceOrderItem, value: any) => {
        let newData: any = {...item}
        newData[fieldName] = value
        onChange(newData)
    }
    
    return (
    <li className="flex items-center gap-2 py-2 rounded-md pr-4 hover:bg-zinc-100">
        <span className={`w-[10px] h-[10px] pl-4 ml-4 ${BADGE_COLORS[item.type]} rounded-full`} />
        <div className="flex flex-col flex-1">
            <input
                className="font-medium h-full w-full p-2 bg-transparent rounded"
                type="text"
                value={item.description}
                onChange={(e) => handleOnChange('description', e.target.value)}
            />
            {/* <h1 className="text-sm text-slate-500">{item.id}</h1> */}
        </div>
        <div className="flex-1 flex items-center justify-end gap-2 mr-4">
            <input
                className="font-medium text-right h-full w-[62px] p-2 bg-transparent rounded"
                type="currency"
                value={item.quantity}
                min={1}
                onChange={(e) => handleOnChange('quantity', e.target.value)}
            />
            <p className="font-medium w-[8px]">
                x
            </p>
            <input
                className="font-medium text-right h-full w-[80px] p-2 bg-transparent rounded"
                type="currency"
                min={0}
                value={item.value}
                step="0.01" 
                onChange={(e) => handleOnChange('value', e.target.value)}
            />
            <input
                className="font-medium text-right h-full w-[62px] p-2 bg-transparent rounded"
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
            <ConfirmButton
                message="Deseja realmente excluir esse item?"
                title="Excluir item"
                variant={'link'}
                onConfirm={() => onDelete(item)}>
                    <Trash2Icon size={20} className="opacity-0 stroke-red-500  h-full hover:opacity-100 active:scale-90"/>
            </ConfirmButton>
        </div>
    </li>
)};

ServiceOrderItems.Footer = ({ total, subtotal, parts, services, discount }: { total: number; subtotal: number; parts: number; services: number; discount: number }) => (
    <div className="flex justify-between mt-8">
        <span className="flex flex-1 gap-8">
            <PriceTag id='total-price' label='Subotal' value={currencyFormat(subtotal, "currency")}/>
            <PriceTag id='discounts-price' label='Descontos' value={currencyFormat(discount, "currency")} />            
        </span>
        <span className="flex gap-8 text-right">
            <PriceTag id='pieces-price' label='Peças' value={currencyFormat(parts, "currency")} />
            <PriceTag id='services-price' label='Serviços' value={currencyFormat(services, "currency")} />
            <PriceTag id='total-price' label='Total' className={`${(total < 0) && 'text-red-500'}`} value={currencyFormat(total, "currency")}/>
        </span>
    </div>
);

export default ServiceOrderItems;