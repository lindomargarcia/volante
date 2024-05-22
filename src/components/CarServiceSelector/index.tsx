import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { Crosshair, DrillIcon, HammerIcon, Paintbrush, SwatchBookIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import CarSelector from "../Car3D/CarModel"
import { CAR_PARTS, CarMaterialsTypes } from "../Car3D/types"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandItem, CommandList } from "../ui/command"
import { CAR_ACTIONS, SEVERITY_STATUS } from "@/pages/ServiceOrder/types"

interface ICarAction {
    value: CAR_ACTIONS,
    option?: CAR_ACTIONS | SEVERITY_STATUS
}

interface IDamage {
    severity: SEVERITY_STATUS;
    car_parts: CAR_PARTS[];
  }

function CarServiceSelector() {
  const [action, setAction] = useState<ICarAction>({value: CAR_ACTIONS.DAMAGE, option: SEVERITY_STATUS.MODERATE})
  const [carMaterial, setCarMaterial] = useState(CarMaterialsTypes.RAW)
  const [activeCarParts, setActiveCarParts] = useState<CAR_PARTS[]>([])
  const [separatedColor, setSeparetedColor] = useState<any>([])

  const [services, setServices] = useState({
    [CAR_ACTIONS.DAMAGE]: [],
        painting:{
            type: 'tricolt',
            car_parts: []
        },
        polishing: {
            type: "basic",
            car_parts: []
        }
    })

    const getSeparatedColorsByDamageSeverity = (damageList: IDamage[]) => {
        if(damageList.length === 0)
            return []

        const SEVERITY_COLORS = {
            [SEVERITY_STATUS.CRITICAL]: "#FF0000",  // Vermelho
            [SEVERITY_STATUS.SEVERE]: "#FFA500",    // Laranja
            [SEVERITY_STATUS.MODERATE]: "#FFFF00",  // Amarelo
            [SEVERITY_STATUS.MINOR]: "#0000FF",     // Azul
            [SEVERITY_STATUS.NEGLIGIBLE]: "#00FF00" // Verde
        };

        return damageList.map((damage) => ({value: damage.car_parts, color: SEVERITY_COLORS[damage.severity]}))
    }

  const handleOnActionChange = (action: ICarAction) => {
    if(!action.value) return;
    setAction(action)
    switch(action.value){
      case CAR_ACTIONS.DAMAGE:{
        setCarMaterial(CarMaterialsTypes.RAW)
        // setActiveCarParts([])
        setSeparetedColor(getSeparatedColorsByDamageSeverity(services[CAR_ACTIONS.DAMAGE]))
        break
      }
      case CAR_ACTIONS.PAINT: {
        setCarMaterial(CarMaterialsTypes.PAINT)
        setActiveCarParts(services.painting?.car_parts)
        setSeparetedColor([])
        break
      }
      case CAR_ACTIONS.POLISH: {
        setCarMaterial(CarMaterialsTypes.POLISHING)
        setActiveCarParts(services.polishing?.car_parts)
        setSeparetedColor([])
        break
      }
    }
  }

  const onCarPartsSelectionChange = (lastSelected: CAR_PARTS, selectedList: CAR_PARTS[]) => {
    let updatedServices: any = {...services}

    if(action.value === CAR_ACTIONS.DAMAGE){        
        updatedServices[CAR_ACTIONS.DAMAGE] = getNewDamageList(services[CAR_ACTIONS.DAMAGE], lastSelected, (action.option as SEVERITY_STATUS || SEVERITY_STATUS.MODERATE));
        setSeparetedColor(getSeparatedColorsByDamageSeverity(updatedServices[CAR_ACTIONS.DAMAGE]))
        setActiveCarParts(concatDamagedCarParts(updatedServices[CAR_ACTIONS.DAMAGE]))
    }else{
        updatedServices[action.value] = {...updatedServices[action.value], car_parts: selectedList}
    }
    setServices(updatedServices)
  }

  const concatDamagedCarParts = (damageList: IDamage[]) => damageList.reduce((acc: CAR_PARTS[], item: IDamage) => acc.concat(item.car_parts), [])

    const getNewDamageList = (damageList: IDamage[], selectedCarPart: CAR_PARTS, severity: SEVERITY_STATUS) => {
        let isNewSeverity = true
        let updatedDamageList:IDamage[] = []

        damageList.forEach((damage: IDamage) => {
            let isRemovingCarPart = false
            let updatedDamage = {...damage}

            updatedDamage.car_parts = updatedDamage.car_parts.filter(carPart => {
                if(carPart !== selectedCarPart) return true;
                isRemovingCarPart = true
                return false
            })

            if(damage.severity === severity){
                isNewSeverity = false
                if(!isRemovingCarPart) updatedDamage.car_parts.push(selectedCarPart);
            }

            if(updatedDamage?.car_parts?.length > 0){
                updatedDamageList.push(updatedDamage)
            }

        })

        if(isNewSeverity){
            updatedDamageList.push({severity, car_parts: [selectedCarPart]})
        }

        return updatedDamageList;
    }


  return (
    <div className="flex-col">
      <Canvas frameloop="demand" resize={{scroll: false}} camera={{zoom: 130}} orthographic={true} style={{width: '100%', height: 350}}>
        <Suspense fallback={null}>
          <Environment preset="warehouse"/>
          <OrbitControls zoomToCursor={true} maxZoom={180} minZoom={130} maxPolarAngle={Math.PI/2} rotation={[2.5,0,0]} dampingFactor={0.08}/>
          <CarSelector value={activeCarParts} onChange={onCarPartsSelectionChange} material={carMaterial} carColor={'#F00'} baseColor="#e9fcff" separatedColors={separatedColor}/>
        </Suspense>
      </Canvas>
      <CarSelectorActions value={action} onChange={handleOnActionChange}/>
     </div>
  )
}

interface IProps {
    value: ICarAction,
    onChange: (value: ICarAction) => void
}

export const CarSelectorActions = ({onChange, value}: IProps) => {
    return (
        <ToggleGroup className="gap-8" type="single" value={value.value} onValueChange={(e:CAR_ACTIONS) => onChange({value: e})}>
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
                        <div><Paintbrush/></div>
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

export default CarServiceSelector