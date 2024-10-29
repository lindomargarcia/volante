import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
// import Logo from "@/assets/svg/logo";
import logo from "@/../public/assets/app-logo.png"

const MenuNavLinkVariant = cva('flex items-center gap-2 w-[160px] p-3 rounded-xl text-sm transition hover:bg-highlight hover:text-white', {
    variants: {
        isActive: {
            true: 'font-bold text-white hover:[&_svg]:text-white',
            false: 'text-zinc-400'
        }
    },
    defaultVariants: {
        isActive: false
    }
})
// [&_svg]:text-highlight 
interface MenuProps {
    links: { path: string, label:string, icon?:ReactElement }[]
}

const Menu = ({links}: MenuProps) => {
  return (
    <nav className="select-none flex flex-col items-center justify-center py-8">
        {/* <Logo size={32} color="var(--theme-highlight)"/> */}
        <img src={logo} className="w-[90px] mt-3 mb-4 object-contain"/>
        <ol className="flex-1 my-6 px-4 mt-8 flex flex-col gap-1">
            {links.map(({path, label, icon}) => (
                <NavLink key={path} to={path} className={({isActive}) => cn(MenuNavLinkVariant({isActive}))}>
                    {icon}
                    {label}
                </NavLink>
            ))}
        </ol>
        <Button variant={"link"} className="bg-transparent text-zinc-100">
            <LogOut size={25} className="pr-2"/> Sair
        </Button>
    </nav>
  );
};

export default Menu;
