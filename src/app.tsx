import { Environment } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Model as Phone } from "./phone.js";
import { useEffect, useState } from "react";
import { a, useSpring, config } from "@react-spring/three";
import { Fullscreen, Root, Text } from "@react-three/uikit";
import { easing } from "maath";
import { MeshPhongMaterial, MeshStandardMaterial } from "three";

export function App() {
  const [open, setOpen] = useState(false);
  const [{ rotationY, rotationX, translateZ, translateY, progress }] =
    useSpring(
      {
        rotationY: open ? 0 : Math.PI,
        rotationX: open ? 0 : Math.PI / 2,
        translateZ: open ? 0 : 0.27,
        translateY: open ? 0 : -0.23,
        progress: open ? 0 : 1,
        config: config.slow,
      },
      [open]
    );
  return (
    <Canvas camera={{ position: [0, 0, 0.65] }}>
      <color args={[0]} attach="background" />
      <Environment blur={0.3} background preset="sunset" />
      <ambientLight intensity={1} />
      <a.group
        rotation-y={rotationY}
        rotation-x={rotationX}
        position-y={translateY}
      >
        <Phone animationProgress={progress} />
      </a.group>
      <group position-x={0.22}>
        <Root pixelSize={0.0015} anchorX="left">
          <Text
            backgroundColor="black"
            borderColor="black"
            color="white"
            borderBend={1}
            paddingX={12}
            paddingY={4}
            borderY={4}
            borderX={4}
            panelMaterialClass={MetalMaterial}
            borderRadius={6}
            cursor="pointer"
            marginRight={32}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "CLOSE" : "OPEN"}
          </Text>
        </Root>
      </group>
      <Rig />
    </Canvas>
  );
}

function Rig() {
  const camera = useThree((s) => s.camera);
  const domElement = useThree((s) => s.gl.domElement);
  useEffect(() => {
    const listener = ({ clientX, clientY }: PointerEvent) => {
      easing.damp3(
        camera.position,
        [
          (clientX / window.innerWidth - 0.5) * 0.4,
          (clientY / window.innerHeight - 0.5) * 0.2,
          0.65,
        ],
        0.03,
        0.01
      );
      camera.lookAt(0, 0, 0);
    };
    domElement.addEventListener("pointermove", listener);
    return () => domElement.removeEventListener("pointermove", listener);
  });
  return null;
}

class MetalMaterial extends MeshStandardMaterial {
  constructor() {
    super({
      metalness: 0.9,
      roughness: 0.2,
    });
  }
}
