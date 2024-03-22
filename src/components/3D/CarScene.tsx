import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import CarModel from "./CarModel"

function CarScene() {
  return (
    <Canvas frameloop="demand" resize={{scroll: false}} camera={{zoom: 50}} orthographic={true} className="" style={{width: 300, height: 200}}>
      <Environment preset="warehouse"/>
      <OrbitControls maxDistance={4} dampingFactor={0.05} enableZoom={false} enablePan={false}/>
      <CarModel/>
    </Canvas>
  )
}

export default CarScene