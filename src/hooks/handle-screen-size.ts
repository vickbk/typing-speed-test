import { useEffect, useState } from "react";

export function useScreenSize() {
  const [screen, setScreen] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function resizeScreen() {
      setScreen({ width: window.innerWidth, height: window.innerHeight });
      console.log("resizing", window.innerWidth);
    }
    resizeScreen();
    window.addEventListener("resize", resizeScreen);
    return () => window.removeEventListener("resize", resizeScreen);
  }, []);
  return screen;
}
