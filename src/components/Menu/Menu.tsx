import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
// import Logo from "@/assets/svg/logo";
import logo from "../../../src-tauri/icons/app-icon-transparent.png"

const MenuNavLinkVariant = cva('flex items-center gap-2 w-[120px] p-3 rounded-xl text-zinc-400 text-sm transition', {
    variants: {
        isActive: {
            true: 'font-bold [&_svg]:text-highlight text-zinc-900',
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
        {/* <Logo size={32} color="var(--theme-highlight)"/> */}
        <img src={logo} className="w-[65px]"/>
        <ol className="flex-1 my-6 px-6 mt-12 flex flex-col gap-4">
            {links.map(({path, label, icon}) => (
                <NavLink to={path} className={({isActive}) => cn(MenuNavLinkVariant({isActive}))}>
                    {icon}
                    {label}
                </NavLink>
            ))}
        </ol>
        <Button variant={"link"} className="bg-transparent text-zinc-400">
            <LogOut size={23} className="pr-2"/> Sair
        </Button>
    </nav>
  );
};

export default Menu;
