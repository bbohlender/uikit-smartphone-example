import { useEffect, useState } from "react";
import { Text } from "@react-three/uikit";

export function CurrentTime() {
  const [time, setTime] = useState(() => getCurrentTime());
  useEffect(() => {
    const ref = setInterval(() => setTime(getCurrentTime()), 60 * 1000);
    return () => clearInterval(ref);
  });
  return <Text>{time}</Text>;
}

function getCurrentTime() {
  return new Date().toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}
