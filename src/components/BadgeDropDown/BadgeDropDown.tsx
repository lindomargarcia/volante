import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { STATUS_SERVICE_ORDER } from "@/pages/ServiceOrder/types";
interface StatusDropDownProps {
    title: string,
    value: string | undefined,
    options: {value: STATUS_SERVICE_ORDER, label: string, color?: string, linked?:STATUS_SERVICE_ORDER[]}[]
    onChange: (value: string) => void
}
export default function StatusDropDown({title, value, options, onChange}: StatusDropDownProps) {
    const selected = options.find(item => item.value === value)
    const linked = options.filter(({value}) => selected?.linked ? selected?.linked.includes(value) : false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <Badge className={`h-8 rounded-full ${selected?.color} focus:border-dashed`}>{selected?.label}</Badge>
            </DropdownMenuTrigger>
            {linked.length > 0 && <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuLabel>{title}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
                    {linked.map(({value, label}) => (
                        <DropdownMenuRadioItem key={value} value={value}>{label}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>}
        </DropdownMenu>
    )
};