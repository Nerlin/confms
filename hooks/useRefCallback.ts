import { useRef } from "react";

export default function useRefCallback<F>(
  callback: F
): {
  current: F;
} {
  const ref = useRef(callback);
  ref.current = callback;
  return ref;
}
