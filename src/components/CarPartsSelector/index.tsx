import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import CarMesh from "../CarMesh";
import { CAR_PARTS, CarMaterialsTypes, ISeparatedColors } from "../CarMesh/types";
import {CAR_ACTIONS,DEFAULT_SELECTION,ICarAction,IDamage,SEVERITY_COLORS,SEVERITY_STATUS} from "./types";
import CarActionToggle from "../CarActionToggle";


function CarServiceSelector() {
  const [action, setAction] = useState<ICarAction>({value: CAR_ACTIONS.DAMAGE,option: SEVERITY_STATUS.CRITICAL});
  const [carMaterial, setCarMaterial] = useState(CarMaterialsTypes.RAW);
  const [activeCarParts, setActiveCarParts] = useState<CAR_PARTS[]>([]);
  const [separatedColor, setSeparetedColor] = useState<ISeparatedColors[]>([]);

  const [services, setServices] = useState(DEFAULT_SELECTION);

  const getSeparatedColorsByDamageSeverity = (damageList: IDamage[]): ISeparatedColors[] =>
    damageList.length === 0
      ? []
      : damageList.map((damage) => ({
          value: damage.car_parts,
          color: SEVERITY_COLORS[damage.severity],
        }));

  const handleOnActionChange = (action: ICarAction) => {
    if (!action.value) return;

    setAction(action);
    switch (action.value) {
      case CAR_ACTIONS.DAMAGE: {
        setCarMaterial(CarMaterialsTypes.RAW);
        // setActiveCarParts([])
        setSeparetedColor(
          getSeparatedColorsByDamageSeverity(services[CAR_ACTIONS.DAMAGE])
        );
        break;
      }
      case CAR_ACTIONS.PAINT: {
        setCarMaterial(CarMaterialsTypes.PAINT);
        setActiveCarParts(services.painting?.car_parts);
        setSeparetedColor([]);
        break;
      }
      case CAR_ACTIONS.POLISH: {
        setCarMaterial(CarMaterialsTypes.POLISHING);
        setActiveCarParts(services.polishing?.car_parts);
        setSeparetedColor([]);
        break;
      }
    }
  };

  const handleOnCarPartsChange = (
    lastSelected: CAR_PARTS,
    selectedList: CAR_PARTS[]
  ) => {
    let updatedServices: any = { ...services };

    if (action.value === CAR_ACTIONS.DAMAGE) {
      updatedServices[CAR_ACTIONS.DAMAGE] = getDamageList(
        services[CAR_ACTIONS.DAMAGE],
        lastSelected,
        (action.option as SEVERITY_STATUS) || SEVERITY_STATUS.CRITICAL
      );
      setSeparetedColor(
        getSeparatedColorsByDamageSeverity(updatedServices[CAR_ACTIONS.DAMAGE])
      );
      setActiveCarParts(
        concatDamagedCarParts(updatedServices[CAR_ACTIONS.DAMAGE])
      );
    } else {
      updatedServices[action.value] = {
        ...updatedServices[action.value],
        car_parts: selectedList,
      };
    }
    setServices(updatedServices);
  };

  const concatDamagedCarParts = (damageList: IDamage[]) =>
    damageList.reduce(
      (acc: CAR_PARTS[], item: IDamage) => acc.concat(item.car_parts),
      []
    );

  const getDamageList = (damageList: IDamage[], selectedCarPart: CAR_PARTS, severity: SEVERITY_STATUS) => {
    let isNewSeverity = true;
    let updatedDamageList: IDamage[] = [];

    damageList.forEach((damage: IDamage) => {
      let updatedDamage = { ...damage };
      let isRemovingCarPart = false;

      updatedDamage.car_parts = updatedDamage.car_parts.filter((carPart) => {
        if (carPart !== selectedCarPart) return true;
        isRemovingCarPart = true;
        return false;
      });

      if (damage.severity === severity) {
        isNewSeverity = false;
        if (!isRemovingCarPart) updatedDamage.car_parts.push(selectedCarPart);
      }

      if (updatedDamage?.car_parts?.length > 0) {
        updatedDamageList.push(updatedDamage);
      }
    });

    if (isNewSeverity) {
      updatedDamageList.push({ severity, car_parts: [selectedCarPart] });
    }

    return updatedDamageList;
  };

  return (
    <div className="flex-col">
      <Canvas
        frameloop="demand"
        resize={{ scroll: false }}
        camera={{ zoom: 130 }}
        orthographic={true}
        style={{ width: "100%", height: 350 }}
      >
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
            carColor={"#F00"}
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
