import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import CarModel from "./CarModel"

function CarScene() {
  return (
    <Canvas  resize={{scroll: false}} camera={{zoom: 50}} orthographic={true} className="rounded-md border bg-background" style={{width: 300, height: 300}}>
      <Environment preset="warehouse"/>
      <OrbitControls maxDistance={4} dampingFactor={0.05} enableZoom={false} enablePan={false}/>
      <CarModel/>
    </Canvas>
  )
}

export default CarScene