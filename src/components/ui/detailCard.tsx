import { VariantProps, cva } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { ReactElement } from "react";

const DetailCardVariants = cva("relative flex flex-row text-left text-sm items-center p-4 hover:bg-gray-50", {
    variants:{
        side:{
            default: "rounded-lg",
            left: "rounded-tl-lg rounded-bl-lg",
            right: "rounded-tr-lg rounded-br-lg" 
        },
    },
    defaultVariants:{
        side: "default",
    }
})

interface DetailCardProps extends VariantProps<typeof DetailCardVariants>{
    title?: string | ReactElement,
    subtitle?: string,
    src?: string,
    fallback?: string | any,
    className?: string,
    ready?: boolean
}

function DetailCard({title, subtitle, src, fallback, side, ready, className, ...props}: DetailCardProps) {
    return ( 
        <Card {...props} className={cn(DetailCardVariants({side, className}))}>
            <Avatar className={`mr-3 ${ready ? 'bg-[--theme-highlight] text-white' : 'bg-muted'}`}>
                <AvatarImage src={src}/>
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <span>
                {title && <h1 className="font-semibold">{title}</h1>}
                {subtitle && <h2 className="text-muted-foreground">{subtitle}</h2>}
            </span>
        </Card>
    );
}

export default DetailCard;