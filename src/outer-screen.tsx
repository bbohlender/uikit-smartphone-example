import { PerspectiveCamera } from "@react-three/drei";
import {
  Root,
  Image,
  Text,
  DefaultProperties,
  Container,
} from "@react-three/uikit";
import { CurrentTime } from "./current-time.js";
import { useMemo } from "react";
import { VideoTexture } from "three";

export function OuterScreen({ video }: { video: HTMLVideoElement }) {
  const texture = useMemo(() => new VideoTexture(video), [video]);
  return (
    <>
      <Root
        sizeX={2 * 1.85}
        sizeY={2}
        positionType="relative"
        backgroundColor="black"
      >
        <Image
          inset={0}
          positionType="absolute"
          fit="cover"
          src={texture}
          padding={32}
          cursor="pointer"
        >
          <Container flexDirection="column" zIndexOffset={1}>
            <DefaultProperties fontWeight="medium" fontSize={48}>
              <CurrentTime />
            </DefaultProperties>
            <Text fontSize={24}>Start Camera</Text>
          </Container>
        </Image>
      </Root>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 1]}
        aspect={1.85}
        manual
        fov={90}
      />
    </>
  );
}
