import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface FormInputProps {
    name:  string,
    label?: string,
    placeholder?: string,
    type: string,
    form: UseFormReturn<any>
}
 
const FormInput = ({name, label, placeholder, type, form}: FormInputProps) => {
    return ( 
        <FormField control={form.control} name={name} render={({field}) => (
            <FormItem className="flex items-center">
                <FormLabel className="w-[60px] text-right pr-3">{label}</FormLabel>
                    <span className="flex-1 h-[40px]">
                        <FormControl>
                            <Input placeholder={placeholder} type={type} {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </span>
            </FormItem>
            )}>
        </FormField> );
}
 
export default FormInput;