import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "./label";

interface SelectOptionProps{
    value?: string,
    placeholder?: string,
    options: {value: string, label: string, color?: string}[],
    className?: string,
    label?: string,
    disabled?: boolean,
    onChange?: (value: string) => void
}
 
const SelectOption = ({value, placeholder,options, className, disabled, label, onChange}: SelectOptionProps) => {
    return ( 
        <span className="flex flex-1 flex-col">
        {label && <Label className={`text-sm mb-1 ${disabled && 'text-muted-foreground'}`}>{label}</Label>}
        <Select disabled={disabled} defaultValue={value} value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/* <SelectLabel>Title</SelectLabel> */}
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            <span className="flex items-center">
                                {option?.color && <div className={`w-3 h-3 rounded-full mr-1 ${option.color}`}></div>}
                                {option.label}
                            </span>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
        </span>
     );
}
 
export default SelectOption;