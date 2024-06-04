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

function CarServiceSelector({color, value, onChange}: IProps) {
  const [action, setAction] = useState<ICarAction>({value: CAR_ACTIONS.DAMAGE, option: SEVERITY_STATUS.CRITICAL});
  const [carMaterial, setCarMaterial] = useState(CarMaterialsTypes.RAW);
  const [activeCarParts, setActiveCarParts] = useState<CAR_PARTS[]>([]);
  const [separatedColor, setSeparetedColor] = useState<ISeparatedColors[]>([]);
  const [services, setServices] = useState<ICarSelectionValue>(value || DEFAULT_SELECTION);

  const handleOnActionChange = (data: ICarAction) => {
    if (!data.value) return;

    switch (data.value) {
      case CAR_ACTIONS.DAMAGE: {
        setCarMaterial(CarMaterialsTypes.RAW);
        setSeparetedColor(getSeparatedColorsByDamageSeverity(services[CAR_ACTIONS.DAMAGE]));
        setActiveCarParts(reduceDamagedCarParts(services[CAR_ACTIONS.DAMAGE]));
        setAction(data)
        break;
      }
      case CAR_ACTIONS.PAINT: {
        setCarMaterial(CarMaterialsTypes.PAINT);
        setSeparetedColor([]);
        setActiveCarParts(services[CAR_ACTIONS.PAINT]?.car_parts);
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
        setCarMaterial(CarMaterialsTypes.POLISHING);
        setSeparetedColor([]);
        setActiveCarParts(services[CAR_ACTIONS.RECOVER]?.car_parts);
        setAction(data)
        break;
      }
    }
  };

  const handleOnCarPartsChange = (selected: CAR_PARTS, selectedList: CAR_PARTS[]) => {
    let updatedServices: any = { ...services };

    if (action.value === CAR_ACTIONS.DAMAGE) {
      updatedServices[CAR_ACTIONS.DAMAGE] = getDamageList(services[CAR_ACTIONS.DAMAGE],selected,(action.option as SEVERITY_STATUS) || SEVERITY_STATUS.CRITICAL);
      setSeparetedColor(getSeparatedColorsByDamageSeverity(updatedServices[CAR_ACTIONS.DAMAGE]));
      setActiveCarParts(reduceDamagedCarParts(updatedServices[CAR_ACTIONS.DAMAGE]));
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
            value={activeCarParts}
            onChange={handleOnCarPartsChange}
            material={carMaterial}
            carColor={color}
            baseColor="#e9fcff"
            separatedColors={separatedColor}
          />
        </Suspense>
      </Canvas>
      <CarActionToggle value={action} onChange={handleOnActionChange} />
    </div>
  );
}

export default CarServiceSelector;
