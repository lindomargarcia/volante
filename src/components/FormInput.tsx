import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { ReactElement } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface FormInputProps {
    name:  string,
    label?: string,
    placeholder?: string,
    className?: string,
    type?: string,
    form: UseFormReturn<any>
    input?: (field: ControllerRenderProps<any, string>) => ReactElement<any>
}
 
const FormInput = ({name, label, placeholder, type, className, form, input}: FormInputProps) => {
    return ( 
        <FormField control={form.control} name={name} render={({field}) => (
            <FormItem className="flex items-center">
                <FormLabel className="w-[60px] text-right pr-3">{label}</FormLabel>
                <span className="flex-1 h-[40px]">
                    <FormControl>
                        {input ? input(field) : <Input placeholder={placeholder} className={className} type={type} {...field}/>}
                    </FormControl>
                    <FormMessage/>
                </span>
            </FormItem>
            )}>
        </FormField> );
}

interface FormSelectProps extends FormInputProps {
    options: string[]
}

const FormSelect = ({name, label, form, options, placeholder}: FormSelectProps) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
            <FormItem className="flex items-center">
                <FormLabel className="w-[60px] text-right pr-3">{label}</FormLabel>
                <span className="flex-1">
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option: string) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </span>
            </FormItem>
            )}
        />
    )
}
 
export { FormInput, FormSelect};