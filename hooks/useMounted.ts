import { RefObject, useEffect, useRef } from "react";


export default function useMounted(): RefObject<boolean> {
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, [])

  return mounted;
}