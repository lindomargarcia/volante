import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import CarMesh from "../CarMesh";
import { CAR_PARTS, CarMaterialsTypes, ISeparatedColors } from "../CarMesh/types";
import {CAR_ACTIONS,DEFAULT_SELECTION,ICarAction,ICarSelectionValue,IChangeValue,SEVERITY_STATUS} from "./types";
import CarActionToggle from "../CarActionToggle";
import { getDamageList, getSeparatedColorsByDamageSeverity, reduceDamagedCarParts } from "./logic";
interface IProps{
  color: string,
  value: ICarSelectionValue,
  onChange: (value: IChangeValue, state: ICarSelectionValue) => void
}

interface CarMeshSettingsProps {
  material: CarMaterialsTypes,
  color: string,
  selected: CAR_PARTS[]
}

function CarServiceSelector({color, value, onChange}: IProps) {
  const [action, setAction] = useState<ICarAction>({value: CAR_ACTIONS.DAMAGE, option: SEVERITY_STATUS.CRITICAL});
  const [separatedColor, setSeparetedColor] = useState<ISeparatedColors[]>([]);
  const [services, setServices] = useState<ICarSelectionValue>(value || DEFAULT_SELECTION);
  const [carMeshSetting, setCarMeshSettings] = useState<CarMeshSettingsProps>({
    color: color,
    material: CarMaterialsTypes.RAW,
    selected: [],
  })

  const onActionChange = (data: ICarAction) => {
    if (!data.value) return;

    switch (data.value) {
      case CAR_ACTIONS.DAMAGE: {
        setCarMeshSettings({material: CarMaterialsTypes.RAW, selected: reduceDamagedCarParts(services[CAR_ACTIONS.DAMAGE]), color: color})
        setSeparetedColor(getSeparatedColorsByDamageSeverity(services[CAR_ACTIONS.DAMAGE]));
        setAction(data)
        break;
      }
      case CAR_ACTIONS.PAINT: {
        setCarMeshSettings({material: CarMaterialsTypes.PAINT, selected: services[CAR_ACTIONS.PAINT]?.car_parts, color: color})
        setSeparetedColor([]);
        if(data.option){
          let updatedServices = {...services}
          updatedServices.paint.type = data.option
          setServices(updatedServices)
          setAction(data)
        }else{
          setAction({...data, option: services.paint.type})
        }
        break;
      }
      case CAR_ACTIONS.RECOVER: {
        setCarMeshSettings({material: CarMaterialsTypes.POLISHING, selected: services[CAR_ACTIONS.RECOVER]?.car_parts, color: color})
        setSeparetedColor([]);
        setAction(data)
        break;
      }
    }
  };

  const onCarPartClick = (selected: CAR_PARTS, selectedList: CAR_PARTS[]) => {
    let updatedServices: any = { ...services };

    if (action.value === CAR_ACTIONS.DAMAGE) {
      updatedServices[CAR_ACTIONS.DAMAGE] = getDamageList(services[CAR_ACTIONS.DAMAGE],selected,(action.option as SEVERITY_STATUS) || SEVERITY_STATUS.CRITICAL);
      setSeparetedColor(getSeparatedColorsByDamageSeverity(updatedServices[CAR_ACTIONS.DAMAGE]));
      setCarMeshSettings({...carMeshSetting, selected: reduceDamagedCarParts(updatedServices[CAR_ACTIONS.DAMAGE])})
    } else {
      updatedServices[action.value] = {
        ...updatedServices[action.value],
        car_parts: selectedList,
      };
    }
    setServices(updatedServices);
    onChange({car_part: selected, action}, updatedServices)
  };

  return (
    <div className="flex-col">
      <Canvas frameloop="demand" resize={{ scroll: false }} camera={{ zoom: 120 }} orthographic={true} style={{ width: "100%", height: 300 }}>
        <Suspense fallback={null}>
          <Environment preset="warehouse" />
          <OrbitControls
            zoomToCursor={true}
            maxZoom={180}
            minZoom={130}
            maxPolarAngle={Math.PI / 2}
            rotation={[2.5, 0, 0]}
            dampingFactor={0.08}
          />
          <CarMesh
            onChange={onCarPartClick}
            baseColor="#e9fcff"
            value={carMeshSetting.selected}
            material={carMeshSetting.material}
            carColor={carMeshSetting.color}
            separatedColors={separatedColor}
          />
        </Suspense>
      </Canvas>
      <CarActionToggle value={action} onChange={onActionChange} />
    </div>
  );
}

export default CarServiceSelector;
