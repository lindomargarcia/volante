import { VariantProps, cva } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

const DetailCardVariants = cva("flex flex-1 flex-row text-left items-center border p-4 hover:bg-gray-50", {
    variants:{
        side:{
            default: "rounded",
            left: "rounded-tl-lg rounded-bl-lg",
            right: "rounded-tr-lg rounded-br-lg" 
        }
    },
    defaultVariants:{
        side: "default"
    }
})

interface DetailCardProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof DetailCardVariants>{
    title?: string,
    subtitle?: string,
    src?: string,
    fallback?: string | any,
    className?: string
}

function DetailCard({title, subtitle, src, fallback, side, className, ...props}: DetailCardProps) {
    return ( 
        <button {...props} className={cn(DetailCardVariants({side, className}))}>
            <Avatar className="mr-3">
                <AvatarImage src={src}/>
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <span>
                {title && <h1 className="font-semibold">{title}</h1>}
                {subtitle && <h2 className="text-sm text-muted-foreground">{subtitle}</h2>}
            </span>
        </button>
    );
}

export default DetailCard;