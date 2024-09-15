import { useGLTF } from "@react-three/drei"
import { ThreeEvent } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { CAR_PARTS, CAR_MATERIALS_SETTINGS, CarMaterialsTypes, ISeparatedColors } from "./types";

interface IProps {
  value?: CAR_PARTS[]
  material?: CarMaterialsTypes
  carColor: string
  baseColor?: string
  separatedColors?: ISeparatedColors[]
  onChange?: (value: CAR_PARTS, selectedList: CAR_PARTS[], selected: boolean) => void
}

function CarMesh({value = [], material = CarMaterialsTypes.PAINT, baseColor = '#FFF', carColor, onChange = () => {}, separatedColors}: IProps) {
    const { nodes }: any = useGLTF('src/assets/3d/carMesh.glb')
    const [selected, setSelectedList] = useState<CAR_PARTS[]>([])
    const carRef = useRef<any>()

    useEffect(()=>{
      carRef.current.rotation.y = Math.PI * -0.70
    }, [nodes])

    useEffect(()=>{
      setSelectedList(value)
    }, [value])

    const handleOnSelectCarPart = (e:ThreeEvent<any>) => {
        e.stopPropagation()
        const clickedCarPart = e.eventObject.name as CAR_PARTS
        setSelectedList(selectedCarParts => {
          const isCarPartSelected = selectedCarParts.includes(clickedCarPart);
          let newSelectedCarPartsList = isCarPartSelected ? selectedCarParts.filter(value => value !== clickedCarPart) : [...selectedCarParts, clickedCarPart];
          onChange(clickedCarPart, newSelectedCarPartsList, !isCarPartSelected)
          return newSelectedCarPartsList
      });
    }

    const getMaterial = (carPartName:CAR_PARTS): any => {
      //brake car
      // if(selected) return <MeshDistortMaterial speed={0} factor={13} color={'#636f76'} metalness={0} roughness={1} />
      const isSelected = selected.includes(carPartName)
      if(!isSelected)
        return getDefaultMaterial()
    
      const materialSettings = CAR_MATERIALS_SETTINGS[material]
      if(!separatedColors || separatedColors.length === 0)
        return <meshStandardMaterial {...materialSettings} color={materialSettings.color || carColor} fog={false}/>

      let colorParams = separatedColors.find(separatedColor => separatedColor.value.includes(carPartName))
      return <meshStandardMaterial {...materialSettings} color={colorParams?.color || carColor} fog={false}/>
    }
    
    const getDefaultMaterial = () => <meshStandardMaterial {...CAR_MATERIALS_SETTINGS.raw} color={baseColor} fog={false}/>

    return (
      <group dispose={null} ref={carRef}>
      <group position={[0, 0, -0.412]}>
        <mesh
          name={CAR_PARTS.FLOOR}     
          geometry={nodes.Cube001_1.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.FLOOR)}</mesh>
        <mesh
          name={CAR_PARTS.REAR}          
          geometry={nodes.Cube001_2.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.REAR)}</mesh>
        <mesh
          name={CAR_PARTS.TRUNK}          
          geometry={nodes.Cube001_3.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.TRUNK)}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_REAR_SIDE}          
          geometry={nodes.Cube001_4.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.LEFT_REAR_SIDE)}</mesh>
        <mesh
          name={CAR_PARTS.RIGHT_REAR_SIDE}          
          geometry={nodes.Cube001_5.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.RIGHT_REAR_SIDE)}</mesh>
        <mesh
          name={CAR_PARTS.RIGHT_REAR_DOOR}          
          geometry={nodes.Cube001_6.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.RIGHT_REAR_DOOR)}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_REAR_DOOR}          
          geometry={nodes.Cube001_7.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.LEFT_REAR_DOOR)}</mesh>
        <mesh
        name={CAR_PARTS.RIGHT_FRONT_DOOR}          
          geometry={nodes.Cube001_8.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.RIGHT_FRONT_DOOR)}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_FRONT_DOOR}          
          geometry={nodes.Cube001_9.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.LEFT_FRONT_DOOR)}</mesh>
        <mesh
          name={CAR_PARTS.RIGHT_FRONT_FENDER}          
          geometry={nodes.Cube001_10.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.RIGHT_FRONT_FENDER)}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_FRONT_FENDER}          
          geometry={nodes.Cube001_11.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.LEFT_FRONT_FENDER)}</mesh>
        <mesh
          name={CAR_PARTS.ROOF}          
          geometry={nodes.Cube001_12.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.ROOF)}</mesh>
        <mesh
          name={CAR_PARTS.HOOD}          
          geometry={nodes.Cube001_13.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.HOOD)}</mesh>
        <mesh
          name={CAR_PARTS.FRONT_BUMPER}          
          geometry={nodes.Cube001_14.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.FRONT_BUMPER)}</mesh>
        <mesh
          name={CAR_PARTS.WINDSHIELD}          
          geometry={nodes.Cube001_15.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.WINDSHIELD)}</mesh>
      </group>
      <group position={[-0.672, 0.306, -0.657]} rotation={[0, 0, -0.379]} scale={0.7}>
        <mesh
          name={CAR_PARTS.RIGHT_MIRROR}          
          geometry={nodes.Cube_1.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.RIGHT_MIRROR)}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_MIRROR}          
          geometry={nodes.Cube_2.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(CAR_PARTS.LEFT_MIRROR)}</mesh>
      </group>
    </group>
      )
}

export default CarMesh
useGLTF.preload('src/assets/3d/car.glb')