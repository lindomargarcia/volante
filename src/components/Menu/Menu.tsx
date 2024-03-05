import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Logout } from "@icon-park/react";
import Logo from "@/assets/svg/logo";

const MenuNavLinkVariant = cva('flex items-center gap-2 w-[112px] p-3 rounded-xl text-zinc-400 text-sm transition', {
    variants: {
        isActive: {
            true: 'font-bold [&_svg]:text-accent text-zinc-900',
            false: 'hover:bg-zinc-200'
        }
    },
    defaultVariants: {
        isActive: false
    }
})

interface MenuProps {
    links: { path: string, label:string, icon?:ReactElement }[]
}

const Menu = ({links}: MenuProps) => {
  return (
    <nav className="select-none flex flex-col items-center justify-center py-8">
        <Logo size={32} color="var(--accent)"/>
        <ol className="flex-1 my-6 px-8 mt-12 flex flex-col gap-3">
            {links.map(({path, label, icon}) => (
                <NavLink to={path} className={({isActive}) => cn(MenuNavLinkVariant({isActive}))}>
                    {icon}
                    {label}
                </NavLink>
            ))}
        </ol>
        <Button variant={"link"} className="bg-transparent text-zinc-400">
            <Logout size={16} className="pr-2"/> Sair
        </Button>
    </nav>
  );
};

export default Menu;
