import { MeshReflectorMaterial, useGLTF } from "@react-three/drei"
import { ThreeEvent } from "@react-three/fiber"
import { useRef, useState } from "react"
import { Group, Object3DEventMap } from "three"

enum CAR_PARTS {
    TUDO = "Cube001",
    CAPO = "capo",
    FRENTE_CIMA = "frente_cima",
    FRENTE = "frente",
    FRENTE_BAIXO = "frente_baixo",
    PORTA_FRENTE_ESQ = "porta_frente_esq",
    PORTA_TRAS_ESQ = "porta_tras_esq",
    FRENTE_ESQ = "frente_esq",
    PORTA_FRENTE_DIR = "porta_frente_dir",
    FRENTE_DIR = "frente_dir",
    PORTA_TRAS_DIR = "porta_tras_dir",
    TETO = "teto",
    TRAS = "tras",
    PORTA_MALAS = "porta_malas",
    PARABRISA = "parabrisa",
    TRAS_DIR = "tras_dir",
    TRAS_ESQ = "tras_esq",
}
type CarPartsObject = Partial<Record<CAR_PARTS, boolean>>;

function CarModel() {
    const { nodes }: any = useGLTF('src/assets/3d/car.glb')
    const [selectedCarParts, setSelectedCarParts] = useState<CarPartsObject>({})
    const carMesh = useRef<Group<Object3DEventMap> | null>(null)

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
      return <MeshReflectorMaterial mirror={0} roughness={selected ? 0.01 : 1} color={selected ? '#FFF' : '#A1A1AA'}/>
    }

    return (
    <group dispose={null} ref={carMesh}>
        <group name="Car" position={[-0.25, 0.3, 0]}>
          <mesh
            name={CAR_PARTS.TUDO}
            geometry={nodes.Cube001.geometry}
          >{getMaterial(false)}</mesh>

          <mesh
            name={CAR_PARTS.CAPO}
            geometry={nodes.Cube001_1.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts.capo)
          }</mesh>
          <mesh
            name={CAR_PARTS.FRENTE_CIMA}
            geometry={nodes.Cube001_2.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.FRENTE_CIMA])
          }</mesh>
          <mesh
            name={CAR_PARTS.FRENTE}
            geometry={nodes.Cube001_3.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.FRENTE])
          }</mesh>
          <mesh
            name={CAR_PARTS.FRENTE_BAIXO}
            geometry={nodes.Cube001_4.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.FRENTE_BAIXO])
          }</mesh>
          <mesh
            name={CAR_PARTS.PORTA_FRENTE_ESQ}
            geometry={nodes.Cube001_5.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.PORTA_FRENTE_ESQ])
          }</mesh>
          <mesh
            name={CAR_PARTS.PORTA_TRAS_ESQ}
            geometry={nodes.Cube001_6.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.PORTA_TRAS_ESQ])
          }</mesh>
          <mesh
            name={CAR_PARTS.FRENTE_ESQ}
            geometry={nodes.Cube001_7.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.FRENTE_ESQ])
          }</mesh>
          <mesh
            name={CAR_PARTS.PORTA_FRENTE_DIR}
            geometry={nodes.Cube001_8.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.PORTA_FRENTE_DIR])
          }</mesh>
          <mesh
            name={CAR_PARTS.FRENTE_DIR}
            geometry={nodes.Cube001_9.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.FRENTE_DIR])
          }</mesh>
          <mesh
            name={CAR_PARTS.PORTA_TRAS_DIR}
            geometry={nodes.Cube001_10.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.PORTA_TRAS_DIR])
          }</mesh>
          <mesh
            name={CAR_PARTS.TETO}
            geometry={nodes.Cube001_11.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.TETO])
          }</mesh>
          <mesh
            name={CAR_PARTS.TRAS}
            geometry={nodes.Cube001_12.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.TRAS])
          }</mesh>
          <mesh
            name={CAR_PARTS.PORTA_MALAS}
            geometry={nodes.Cube001_13.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.PORTA_MALAS])
          }</mesh>
          <mesh
            name={CAR_PARTS.PARABRISA}
            geometry={nodes.Cube001_14.geometry}
          >{getMaterial(false)}</mesh>
          <mesh
            name={CAR_PARTS.TRAS_DIR}
            geometry={nodes.Cube001_15.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.TRAS_DIR])
          }</mesh>
          <mesh
            name={CAR_PARTS.TRAS_ESQ}
            geometry={nodes.Cube001_16.geometry}
            onPointerDown ={(e) => handleOnSelectCarPart(e)}
          >{
            getMaterial(selectedCarParts[CAR_PARTS.TRAS_ESQ])
          }</mesh>
          
        </group>
        
      </group>
      )
}

export default CarModel
useGLTF.preload('src/assets/3d/car.glb')