import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectOptionProps {
    placeholder?: string,
    options: string[]
}
 
const SelectOption = ({placeholder,options}: SelectOptionProps) => {
    return ( 
        <Select>
            <SelectTrigger className="">
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