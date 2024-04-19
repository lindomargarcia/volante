import { MeshReflectorMaterial, useGLTF } from "@react-three/drei"
import { ThreeEvent } from "@react-three/fiber"
import { useState } from "react"
import { Group, Object3DEventMap } from "three"

enum CAR_PARTS {
    TUDO = "Cube001",
    CAPO = "capo",
    FRENTE_CIMA = "frente_cima",
    PARACHOQUE_DIANTEIRO = "frente",
    PORTA_DIANTEIRO_ESQUERDO = "porta_frente_esq",
    PORTA_TRASEIRO_ESQUERDO = "porta_tras_esq",
    PARALAMA_DIANTEIRO_ESQUERDO = "frente_esq",
    PORTA_DIANTEIRA_DIREITO = "porta_frente_dir",
    PARALAMA_DIANTEIRO_DIREITO = "frente_dir",
    PORTA_TRASEIRO_DIREITO = "porta_tras_dir",
    TETO = "teto",
    PARACHOQUE_TRASEIRO = "tras",
    TAMPA_TRASEIRA = "porta_malas",
    PARABRISA = "parabrisa",
    LATERAL_TRASEIRO_DIREITO = "tras_dir",
    LATERAL_TRASEIRO_ESQUERDO = "tras_esq",
}

type CarPartsObject = Partial<Record<CAR_PARTS, boolean>>;

function CarModel() {
    const { nodes,materials }: any = useGLTF('src/assets/3d/carMesh.glb')
    const [selectedCarParts, setSelectedCarParts] = useState<CarPartsObject>({})

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
      return <MeshReflectorMaterial mirror={0} roughness={selected ? 0.01 : 1} color={selected ? '#FF0000' : '#FFF'}/>
    }

    return (
      <group dispose={null}>
      <group position={[0, 0, -0.412]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials.raw}
        />
        <mesh
          name={CAR_PARTS.PARACHOQUE_TRAS}
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          onPointerDown ={(e) => handleOnSelectCarPart(e)}
        >{getMaterial(selectedCarParts.tras)}</mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_3.geometry}
          material={materials['tampa-traseira']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_4.geometry}
          material={materials['lateral-esq']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_5.geometry}
          material={materials['lateral-dir']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_6.geometry}
          material={materials['porta-tras-dir']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_7.geometry}
          material={materials['porta-tras-esq']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_8.geometry}
          material={materials['porta-dian-dir']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_9.geometry}
          material={materials['porta-dian-esq']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_10.geometry}
          material={materials['paralama-dir']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_11.geometry}
          material={materials['paralama-esq']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_12.geometry}
          material={materials.teto}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_13.geometry}
          material={materials.capo}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_14.geometry}
          material={materials['parachoque-dian']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_15.geometry}
          material={materials.parabrisa}
        />
      </group>
      <group position={[-0.672, 0.306, -0.657]} rotation={[0, 0, -0.379]} scale={0.697}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials['retrovisor-dir']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials['retrovisor-esq']}
        />
      </group>
    </group>
      )
}

export default CarModel
useGLTF.preload('src/assets/3d/car.glb')