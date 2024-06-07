import { Crosshair, HammerIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
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
                <ToggleGroupItem value={CAR_ACTIONS.DAMAGE} className="p-0">
                    <PopoverTrigger asChild={true} className=" appearance-none px-3 a py-1">
                        <div className="flex gap-3 justify-center items-center">
                            <Crosshair/><h1>Danos</h1>
                        </div>
                    </PopoverTrigger>
                </ToggleGroupItem>
                <PopoverContent align="center" side="top" className="p-2 mb-2 w-[120px]">
                    <ToggleGroup type="single" className="flex flex-col justify-start align-top" onValueChange={(e: any) => onChange({value: CAR_ACTIONS.DAMAGE, option: e})}>
                        {Object.values(SEVERITY_STATUS).map(value => <ToggleGroupItem className="w-full" key={value} value={value}>{value}</ToggleGroupItem>)}
                    </ToggleGroup>
                </PopoverContent>
            </Popover>
            <ToggleGroupItem value={CAR_ACTIONS.RECOVER}>
                <div className="flex gap-3 justify-center items-center">
                    <HammerIcon/><h1>Recuperar</h1>
                </div>
            </ToggleGroupItem>
            <Popover>
                <ToggleGroupItem value={CAR_ACTIONS.PAINT} className="p-0">
                    <PopoverTrigger asChild={true} className=" appearance-none px-3 a py-1">
                        <div className="flex gap-3 justify-center items-center">
                            <SprayGun/><h1>Pintar</h1>
                        </div>
                    </PopoverTrigger>
                </ToggleGroupItem>
                <PopoverContent align="center" side="top" className="p-2 mb-2 w-[136px]">
                    <ToggleGroup type="single" className="flex flex-col justify-start align-top" value={value.option} onValueChange={(e:CAR_ACTIONS) => onChange({value: CAR_ACTIONS.PAINT, option: e})}>
                        <ToggleGroupItem className="w-full" value="bicomponent">Bicomponente</ToggleGroupItem>
                        <ToggleGroupItem className="w-full" value="poliuretano">Poliuretano</ToggleGroupItem>
                        <ToggleGroupItem className="w-full" value="tricolt">Tricolt</ToggleGroupItem>
                    </ToggleGroup>
                </PopoverContent>
            </Popover>
            {/* <ToggleGroupItem value={CAR_ACTIONS.FIX}><DrillIcon/></ToggleGroupItem> */}
            {/* <ToggleGroupItem value="color"><SwatchBookIcon/></ToggleGroupItem> */}
        </ToggleGroup>
    );
}

export default CarActionToggle