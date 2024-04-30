import { MeshReflectorMaterial, useGLTF } from "@react-three/drei"
import { ThreeEvent } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"

enum CAR_PARTS {
  ALL = "Cube001",
  HOOD = "hood",
  FRONT_BUMPER = "front",
  LEFT_FRONT_DOOR = "front_left_door",
  LEFT_REAR_DOOR = "rear_left_door",
  LEFT_FRONT_FENDER = "front_left_fender",
  RIGHT_FRONT_DOOR = "front_right_door",
  RIGHT_FRONT_FENDER = "front_right_fender",
  RIGHT_REAR_DOOR = "rear_right_door",
  ROOF = "roof",
  REAR = "rear",
  TRUNK = "trunk",
  WINDSHIELD = "windshield",
  RIGHT_REAR_SIDE = "right_rear_side",
  LEFT_REAR_SIDE = "left_rear_side",
  LEFT_MIRROR = "left_mirror",
  RIGHT_MIRROR = "right_mirror",
}

type CarPartsObject = Partial<Record<CAR_PARTS, boolean>>;

function CarModel() {
    const { nodes, materials }: any = useGLTF('src/assets/3d/carMesh.glb')
    const [selectedCarParts, setSelectedCarParts] = useState<CarPartsObject>({})
    // const materialControls = useControls({color: '#FF0000', factor: 2})
    const carRef = useRef<any>()

    useEffect(()=>{
      carRef.current.rotation.y = -Math.PI * 0.5
    }, [carRef])

    const handleOnSelectCarPart = (e:ThreeEvent<any>) => {
        e.stopPropagation()
        const carPartName = e.eventObject.name as CAR_PARTS
        setSelectedCarParts(prevState => {
            const newSelectedCarParts: CarPartsObject = {...prevState};
            if (newSelectedCarParts[carPartName] === undefined) {
                newSelectedCarParts[carPartName] = true;
            } else {
                newSelectedCarParts[carPartName] = !newSelectedCarParts[carPartName];
            }
            return newSelectedCarParts;
        });
    }
    
    const getMaterial = (selected: boolean | undefined): any => {
      //brake car
      // if(selected) return <MeshDistortMaterial speed={0} factor={13} color={'#636f76'} metalness={0} roughness={1} />
      //paint
      return <MeshReflectorMaterial mirror={0} roughness={selected ? 0.02 : 1} metalness={0.2} color={selected ? '#FF0000' : '#FFFFFF'}/>
    }

    return (
      <group dispose={null} ref={carRef}>
      <group position={[0, 0, -0.412]}>
        <mesh          
          geometry={nodes.Cube001_1.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
          material={materials.raw}
        />
        <mesh
          name={CAR_PARTS.REAR}          
          geometry={nodes.Cube001_2.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.REAR])}</mesh>
        <mesh
          name={CAR_PARTS.TRUNK}          
          geometry={nodes.Cube001_3.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.TRUNK])}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_REAR_SIDE}          
          geometry={nodes.Cube001_4.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.LEFT_REAR_SIDE])}</mesh>
        <mesh
          name={CAR_PARTS.RIGHT_REAR_SIDE}          
          geometry={nodes.Cube001_5.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.RIGHT_REAR_SIDE])}</mesh>
        <mesh
          name={CAR_PARTS.RIGHT_REAR_DOOR}          
          geometry={nodes.Cube001_6.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.RIGHT_REAR_DOOR])}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_REAR_DOOR}          
          geometry={nodes.Cube001_7.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.LEFT_REAR_DOOR])}</mesh>
        <mesh
        name={CAR_PARTS.RIGHT_FRONT_DOOR}          
          geometry={nodes.Cube001_8.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.RIGHT_FRONT_DOOR])}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_FRONT_DOOR}          
          geometry={nodes.Cube001_9.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.LEFT_FRONT_DOOR])}</mesh>
        <mesh
          name={CAR_PARTS.RIGHT_FRONT_FENDER}          
          geometry={nodes.Cube001_10.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.RIGHT_FRONT_FENDER])}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_FRONT_FENDER}          
          geometry={nodes.Cube001_11.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.LEFT_FRONT_FENDER])}</mesh>
        <mesh
          name={CAR_PARTS.ROOF}          
          geometry={nodes.Cube001_12.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.ROOF])}</mesh>
        <mesh
          name={CAR_PARTS.HOOD}          
          geometry={nodes.Cube001_13.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.HOOD])}</mesh>
        <mesh
          name={CAR_PARTS.FRONT_BUMPER}          
          geometry={nodes.Cube001_14.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.FRONT_BUMPER])}</mesh>
        <mesh
          name={CAR_PARTS.WINDSHIELD}          
          geometry={nodes.Cube001_15.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.WINDSHIELD])}</mesh>
      </group>
      <group position={[-0.672, 0.306, -0.657]} rotation={[0, 0, -0.379]} scale={0.7}>
        <mesh
          name={CAR_PARTS.RIGHT_MIRROR}          
          geometry={nodes.Cube_1.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.RIGHT_MIRROR])}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_MIRROR}          
          geometry={nodes.Cube_2.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts[CAR_PARTS.LEFT_MIRROR])}</mesh>
      </group>
    </group>
      )
}

export default CarModel
useGLTF.preload('src/assets/3d/car.glb')