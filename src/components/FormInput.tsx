import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { ReactElement } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const FormInputVariants = cva("flex", {
    variants: {
        direction:{
            row: "items-center",
            col: "flex-col"
        },
    },
    defaultVariants:{
        direction: "col"
    }
})
interface FormInputProps extends VariantProps<typeof FormInputVariants> {
    name:  string,
    label?: string,
    placeholder?: string,
    className?: string,
    containerClassName?: string,
    type?: string,
    form: UseFormReturn<any>
    input?: (field: ControllerRenderProps<any, string>) => ReactElement<any>
}

const FormInput = ({name, label, placeholder, type, className, containerClassName, form, input, direction}: FormInputProps) => {
    return ( 
        <FormField control={form.control} name={name} render={({field}) => (
            <FormItem className={cn(FormInputVariants({direction, className: containerClassName}))}>
                {/* text-right pr-3 w-[60px] vai abaixo no FormLabel */}
                {label && <FormLabel className="font-bold">{label}</FormLabel> }
                <span className="flex-1 h-[40px]">
                    <FormControl>
                        {input ? input(field) : <Input placeholder={placeholder} className={className} min={1} type={type} {...field}/>}
                    </FormControl>
                    <FormMessage/>
                </span>
            </FormItem>
            )}>
        </FormField> );
}

interface FormSelectProps extends FormInputProps {
    options: FormSelectOption[]
}

type FormSelectOption = {value: string, label: string, color?: string}

const FormSelect = ({name, label, form, options, placeholder, direction, className}: FormSelectProps) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
            <FormItem className={cn(FormInputVariants({direction, className}))}>
                {label && <FormLabel className="font-bold">{label}</FormLabel>}
                <span>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option: FormSelectOption) => (
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
 
export { FormInput, FormSelect};