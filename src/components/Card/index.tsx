import { Card as BasicCard, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface IProps{
    children?: ReactNode,
    className?: string
}

export default function Card({children, className}: IProps) {
  return (
    <BasicCard className={`rounded-lg flex flex-col flex-1 max-w-[400px] relative active:scale-95 transition hover:border-[--theme-highlight] hover:shadow-lg hover:shadow-[--theme-highlight-100] ${className}`}>
        {children}
    </BasicCard>
  )
}

Card.Container = ({children}: {children: ReactNode}) => {
    return (
        <div className="flex flex-1 items-start content-start align-top gap-2 flex-wrap overflow-y-scroll">
            {children}
        </div>
    )
}

Card.Badge = ({children}: {children: ReactNode}) => {
    return (
        <Badge className="bg-[--theme-highlight] shadow-none absolute right-1 top-1">{children}</Badge>
    )
}

Card.Header = ({title, description, avatar, children, fallback}: {title?: string, description?: string, children?: ReactNode, avatar?: string, fallback?: string}) => {
    return (
        <CardHeader className={'flex flex-row justify-center items-center gap-4 h-21 flex-1 min-w-[160px]'}>
            {(avatar || fallback) && 
                <Avatar>
                    {avatar && <AvatarImage src={avatar}/>}
                    {fallback && <AvatarFallback className="bg-[--theme-highlight-100] text-[--theme-highlight]">{fallback}</AvatarFallback>}
                </Avatar>
            }
            <div className="flex-1 min-w-[160px]">
                {title && <CardTitle>{title}</CardTitle>}
                {description && <CardDescription className="text-md text-gray-500">{description}</CardDescription>}
            </div>
            {children}
        </CardHeader>
    )
}

Card.Content = ({children}: {children: ReactNode}) => {
    return (
        <CardContent>
            {children}
        </CardContent>
    )
}

Card.HeaderActions = ({children}: {children: ReactNode}) => {
    return (
        <div className="flex items-center justify-center">
            {children}
        </div>
    )
}

interface ActionProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    icon: ReactNode,
}
Card.Action = ({icon, ...rest}: ActionProps) => {
    return (
        <button {...rest} className="p-2 m-0 rounded-full hover:bg-gray-200 transition">
            {icon}
        </button>
    );
}