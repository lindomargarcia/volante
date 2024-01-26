import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectOptionProps {
    placeholder?: string,
    options: string[],
    className?: string
}
 
const SelectOption = ({placeholder,options, className}: SelectOptionProps) => {
    return ( 
        <Select>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/* <SelectLabel>Title</SelectLabel> */}
                    {options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
     );
}
 
export default SelectOption;