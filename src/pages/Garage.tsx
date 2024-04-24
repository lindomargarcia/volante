import CarScene from "@/components/3D/CarScene"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Crosshair, DrillIcon, HammerIcon, Paintbrush, SwatchBookIcon } from "lucide-react"

function Garage() {

  return (
    <div className="flex-col flex-1">
      <CarScene/>
      <ToggleGroup type="single" className="mt-6">
        <ToggleGroupItem value="impact"><Crosshair/></ToggleGroupItem>
        <ToggleGroupItem value="paint"><Paintbrush/></ToggleGroupItem>
        <ToggleGroupItem value="fix"><HammerIcon/></ToggleGroupItem>
        <ToggleGroupItem value="dismount"><DrillIcon/></ToggleGroupItem>
        <ToggleGroupItem value="color"><SwatchBookIcon/></ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default Garage