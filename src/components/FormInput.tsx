import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { ReactElement } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface FormInputProps{
    name:  string,
    label?: string,
    placeholder?: string,
    className?: string,
    type?: string,
    form: UseFormReturn<any>
    children?: (field:  ControllerRenderProps<any, string>) => ReactElement<any>
}

const FormInput = ({name, label, form, children, className}: FormInputProps) => {
    return ( 
    <FormField name={name} control={form.control} render={({field}) => (
        <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                {children && children(field)}
            </FormControl>
            <FormMessage/>
        </FormItem>
    )}/>
    );
}

interface FormSelectProps extends FormInputProps {
    options: FormSelectOption[]
}

type FormSelectOption = {value: string, label: string, color?: string}

const FormSelect = ({name, label, form, options, placeholder, className}: FormSelectProps) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
            <FormItem className={className}>
                {label && <FormLabel>{label}</FormLabel>}
                <span>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options && options.map((option: FormSelectOption) => (
                                <SelectItem key={option.value} value={option.value}>
                                    <span className="flex items-center">
                                        {option?.color && <div className={`w-3 h-3 rounded-full mr-1 ${option.color}`}></div>}
                                        {option.label}
                                    </span>
                                </SelectItem>
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
 
export { FormSelect, FormInput };