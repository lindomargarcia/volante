import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import CarModel from "./CarModel"
import { Suspense } from "react"

function CarScene() {
  return (
    <Canvas frameloop="demand" resize={{scroll: false}} camera={{zoom: 140}} orthographic={true} style={{width: '100%', height: '100%'}}>
      {/* <PresentationControls   enabled={true}
          global={true}
          cursor={true}
          snap={false}
          speed={2}
          zoom={1}
          rotation={[0.2, 0, 0]}
          polar={[0, Math.PI / 2]}
          // azimuth={[-Infinity, Infinity]}
          config={{ mass: 2, tension: 170, friction: 26 }}>
        <CarModel/>
      </PresentationControls> */}
      <Suspense fallback={null}>
        <Environment preset="warehouse"/>
        <OrbitControls zoomToCursor={true} maxZoom={165} minZoom={140} maxPolarAngle={Math.PI/2} rotation={[2,0,0]} dampingFactor={0.05}/>
        <CarModel/>
      </Suspense>
    </Canvas>
  )
}

export default CarScene