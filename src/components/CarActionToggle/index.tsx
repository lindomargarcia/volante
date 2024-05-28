import { Crosshair, DrillIcon, HammerIcon, SwatchBookIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandItem, CommandList } from "../ui/command"
import SprayGun from "@/assets/svg/spray_gun"
import { CAR_ACTIONS, ICarAction, SEVERITY_STATUS } from "../CarPartsSelector/types"

interface IProps {
    value: ICarAction,
    onChange: (value: ICarAction) => void
}

export const CarActionToggle = ({onChange, value}: IProps) => {
    return (
        <ToggleGroup size={"lg"} className="gap-8" type="single" value={value.value} onValueChange={(e:CAR_ACTIONS) => onChange({value: e})}>
            <Popover>
                <ToggleGroupItem value="damage" className="p-0">
                    <PopoverTrigger asChild={true} className=" appearance-none px-3 a py-1">
                        <div><Crosshair/></div>
                    </PopoverTrigger>
                </ToggleGroupItem>
                <PopoverContent align="center" side="top" className="p-2 mb-2 w-[120px]">
                    <Command className="p-0">
                        <CommandList className="m-0">
                            {Object.values(SEVERITY_STATUS).map(value => <CommandItem key={value} value={value} onSelect={(e: any) => onChange({value: CAR_ACTIONS.DAMAGE, option: e})}>{value}</CommandItem>)}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Popover>
                <ToggleGroupItem value="painting" className="p-0">
                    <PopoverTrigger asChild={true} className=" appearance-none px-3 a py-1">
                        <div><SprayGun/></div>
                    </PopoverTrigger>
                </ToggleGroupItem>
                <PopoverContent align="center" side="top" className="p-2 mb-2 w-[120px]">
                    <Command className="p-0">
                        <CommandList className="m-0">
                            <CommandItem value="tricolt" onSelect={(e:any) => onChange({value: CAR_ACTIONS.PAINT, option: e})}>Tricolt</CommandItem>
                            <CommandItem value="pearl" onSelect={(e:any) => onChange({value: CAR_ACTIONS.PAINT, option: e})}>Perolada</CommandItem>
                            <CommandItem value="basica" onSelect={(e:any) => onChange({value: CAR_ACTIONS.PAINT, option: e})}>Básica</CommandItem>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <ToggleGroupItem value={CAR_ACTIONS.POLISH}><HammerIcon/></ToggleGroupItem>
            <ToggleGroupItem value={CAR_ACTIONS.FIX}><DrillIcon/></ToggleGroupItem>
            <ToggleGroupItem value="color"><SwatchBookIcon/></ToggleGroupItem>
        </ToggleGroup>
    );
}

export default CarActionToggle