import { VariantProps, cva } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";
import { Check } from "@icon-park/react";

const DetailCardVariants = cva("relative flex flex-1 flex-row text-left items-center border p-4 hover:bg-gray-50", {
    variants:{
        side:{
            default: "rounded",
            left: "rounded-tl-lg rounded-bl-lg",
            right: "rounded-tr-lg rounded-br-lg" 
        },

    },
    defaultVariants:{
        side: "default",
    }
})

interface DetailCardProps extends VariantProps<typeof DetailCardVariants>{
    title?: string,
    subtitle?: string,
    src?: string,
    fallback?: string | any,
    className?: string,
    ready?: boolean
}

function DetailCard({title, subtitle, src, fallback, side, ready, className, ...props}: DetailCardProps) {
    return ( 
        <div {...props} className={cn(DetailCardVariants({side, className}))}>
            <Avatar className="mr-3 bg-muted">
                <AvatarImage src={src}/>
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <span>
                {title && <h1 className="font-semibold">{title}</h1>}
                {subtitle && <h2 className="text-sm text-muted-foreground">{subtitle}</h2>}
            </span>
            {ready && <Check className="absolute bottom-3 right-3 text-green-600"/>}
        </div>
    );
}

export default DetailCard;