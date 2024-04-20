import { MeshReflectorMaterial, useGLTF } from "@react-three/drei"
import { ThreeEvent } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { useControls } from "leva"

enum CAR_PARTS {
  ALL = "Cube001",// TUDO = "Cube001"
  HOOD = "hood",// CAPO = "capo"
  FRONT_TOP = "front_top",// FRENTE_CIMA = "frente_cima"
  FRONT_BUMPER = "front",// PARACHOQUE_DIANTEIRO = "frente"
  LEFT_FRONT_DOOR = "front_left_door",// PORTA_DIANTEIRO_ESQUERDO = "porta_frente_esq"
  LEFT_REAR_DOOR = "rear_left_door",// PORTA_TRASEIRO_ESQUERDO = "porta_tras_esq"
  LEFT_FRONT_FENDER = "front_left_fender",// PARALAMA_DIANTEIRO_ESQUERDO = "frente_esq"
  RIGHT_FRONT_DOOR = "front_right_door",// PORTA_DIANTEIRA_DIREITO = "porta_frente_dir"
  RIGHT_FRONT_FENDER = "front_right_fender",// PARALAMA_DIANTEIRO_DIREITO = "frente_dir"
  RIGHT_REAR_DOOR = "rear_right_door",// PORTA_TRASEIRO_DIREITO = "porta_tras_dir"
  ROOF = "roof",// TETO = "teto"
  REAR_BUMPER = "rear",// PARACHOQUE_TRASEIRO = "tras"
  REAR_DOOR = "trunk",// TAMPA_TRASEIRA = "porta_malas"
  WINDSHIELD = "windshield",// PARABRISA = "parabrisa"
  RIGHT_REAR_SIDE = "rear_right_side",// LATERAL_TRASEIRO_DIREITO = "tras_dir"
  LEFT_REAR_SIDE = "rear_left_side",// LATERAL_TRASEIRO_ESQUERDO = "tras_esq"
  LEFT_MIRROR = "left_mirror",// RETROVISOR_ESQUERDO = "retrovisor_esq"
  RIGHT_MIRROR = "right_mirror",// RETROVISOR_DIREITO = "retrovisor_dir"
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
      return <MeshReflectorMaterial mirror={0} roughness={selected ? 0.02 : 1} color={selected ? '#FF0000' : '#FFFFFF'}/>
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
          name={CAR_PARTS.REAR_BUMPER}          
          geometry={nodes.Cube001_2.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.rear)}</mesh>
        <mesh
          name={CAR_PARTS.REAR_DOOR}          
          geometry={nodes.Cube001_3.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.trunk)}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_REAR_SIDE}          
          geometry={nodes.Cube001_4.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.rear_left_side)}</mesh>
        <mesh
          name={CAR_PARTS.RIGHT_REAR_SIDE}          
          geometry={nodes.Cube001_5.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.rear_right_side)}</mesh>
        <mesh
          name={CAR_PARTS.RIGHT_REAR_DOOR}          
          geometry={nodes.Cube001_6.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.rear_right_door)}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_REAR_DOOR}          
          geometry={nodes.Cube001_7.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.rear_left_door)}</mesh>
        <mesh
        name={CAR_PARTS.RIGHT_FRONT_DOOR}          
          geometry={nodes.Cube001_8.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.front_right_door)}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_FRONT_DOOR}          
          geometry={nodes.Cube001_9.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.front_left_door)}</mesh>
        <mesh
          name={CAR_PARTS.RIGHT_FRONT_FENDER}          
          geometry={nodes.Cube001_10.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.front_right_fender)}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_FRONT_FENDER}          
          geometry={nodes.Cube001_11.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.front_left_fender)}</mesh>
        <mesh
          name={CAR_PARTS.ROOF}          
          geometry={nodes.Cube001_12.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.roof)}</mesh>
        <mesh
          name={CAR_PARTS.HOOD}          
          geometry={nodes.Cube001_13.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.hood)}</mesh>
        <mesh
          name={CAR_PARTS.FRONT_BUMPER}          
          geometry={nodes.Cube001_14.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.front)}</mesh>
        <mesh
          name={CAR_PARTS.WINDSHIELD}          
          geometry={nodes.Cube001_15.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.windshield)}</mesh>
      </group>
      <group position={[-0.672, 0.306, -0.657]} rotation={[0, 0, -0.379]} scale={0.7}>
        <mesh
          name={CAR_PARTS.RIGHT_MIRROR}          
          geometry={nodes.Cube_1.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.right_mirror)}</mesh>
        <mesh
          name={CAR_PARTS.LEFT_MIRROR}          
          geometry={nodes.Cube_2.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.left_mirror)}</mesh>
      </group>
    </group>
      )
}

export default CarModel
useGLTF.preload('src/assets/3d/car.glb')