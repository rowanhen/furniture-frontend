import React, { useRef, useState, Suspense } from 'react'
import { useGLTF, ContactShadows, OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from "@react-three/fiber";
import { proxy, useSnapshot} from 'valtio'
import "../../controls.css"
import { ListDesigns } from '../ListDesigns';
import { SaveDesign } from '../SaveDesign';
import { SwatchesPicker } from '../SwatchesPicker';

const state = proxy({
    product: "Barcelona Chair",
    current: null,
    items: {
        chairUpper: "#000000",
        chairLower: "#000000",
        buttonsUpper: "#ffffff",
        buttonsLower: "#ffffff",
        backing: "#ffffff",
        frame: "#ffffff",
    }
});

function Model(props) {
  const group = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/scene.gltf')
  return (
    <group 
        ref={group} 
        {...props} 
        dispose={null}
    >
        <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh className="mesh" 
            geometry={nodes.Plane001_0_6.geometry} 
            material={materials.chairUpper} 
            material-color={snap.items.chairUpper} 
            scale={props.mesh[0] ? 1 : 0}
            />
            <mesh className="mesh" 
            geometry={nodes.Plane001_0_3.geometry} 
            material={materials.chairLower} 
            material-color={snap.items.chairLower} 
            scale={props.mesh[1] ? 1 : 0}
            />
            <mesh className="mesh" 
            geometry={nodes.Plane001_0_5.geometry} 
            material={materials.buttonsUpper} 
            material-color={snap.items.buttonsUpper} 
            scale={props.mesh[2] ? 1 : 0}
            />
            <mesh className="mesh"
            geometry={nodes.Plane001_0_1.geometry} 
            material={materials.buttonsLower} 
            material-color={snap.items.buttonsLower}
            scale={props.mesh[3] ? 1 : 0}
            />
            <mesh className="mesh" 
            geometry={nodes.Plane001_0_2.geometry} 
            material={materials.backing} 
            material-color={snap.items.backing}
            scale={props.mesh[4] ? 1 : 0} 
            />
            <mesh className="mesh" 
            geometry={nodes.Plane001_0_4.geometry} 
            material={materials.frame} 
            material-color={snap.items.frame} 
            scale={props.mesh[5] ? 1 : 0}
            />
        </group>
    </group>
  )
}
useGLTF.preload('/scene.gltf')

function HTML(props){
    return(
        <>
        <ListDesigns productName={state.product} state={state} />
        <div className="controls-overlay">
            {Object.entries(state.items).map( (e, index) => {
                return (
                <div className="chair" key={index}>
                    <div className="chair__area">{e[0]}
                      <button className="chair__area__hide" onClick={() => props.setMesh[index](!(props.mesh[index]))}>hide mesh</button>
                    </div>
                    <div className="chair__colour">colour: {e[1]}</div>
                    <SwatchesPicker className="picker"
                      onChange={(color) => (state.items[e[0]] = color)}
                      presetColors={(index >= 4) ? [ "#ffffff", "#cd9323", "#000000" ] : [ "#ffffff", "#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808", "#000000"]} 
                    />
                </div>
                )
            })}
        <button className="chair__toggle__rotate" onClick={() => props.setRotate(!props.rotate)}>rotate: {`${props.rotate}`}</button>
        <SaveDesign state={state} product={state.product} />
        </div>
        </>
    )
}

export default function BarcelonaChairScene() {
    const [mesh0, setMesh0] = useState(true)
    const [mesh1, setMesh1] = useState(true)
    const [mesh2, setMesh2] = useState(true)
    const [mesh3, setMesh3] = useState(true)
    const [mesh4, setMesh4] = useState(true)
    const [mesh5, setMesh5] = useState(true)
  
    const [ rotate, setRotate ] = useState(true);

    return (
        <>
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position:[10,10,30] }}>
                <OrbitControls autoRotate={true} autoRotateSpeed={rotate ? 1 : 0} />
                <Suspense fallback={null}>
                    <Environment preset="warehouse" />
                    <Model mesh={[mesh0, mesh1, mesh2, mesh3, mesh4, mesh5]} />
                    <ContactShadows
                    rotation={[Math.PI / 2, 0, 0]}
                    position={[0, -4.75, 0]}
                    width={15}
                    height={15}
                    blur={2.5}
                    far={4.75}
                    />
                </Suspense>
                {/* <mesh rotation-x={-Math.PI / 2} scale={100} position={[0, -4.75, 0]}>
                <planeGeometry />
                <meshStandardMaterial color="#0000ff" transparent depthWrite={false} />
                </mesh> */}
            </Canvas>
            <HTML setMesh={[setMesh0, setMesh1, setMesh2, setMesh3, setMesh4, setMesh5]} mesh={[mesh0, mesh1, mesh2, mesh3, mesh4, mesh5]} setRotate={setRotate} rotate={rotate} />
         </>
    )
}
