import React, { useCallback, useState } from "react";


export default function useInput(initialValue: string = "") {
  const [value, setValue] = useState(initialValue);

  const changeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, changeValue, setValue] as const;
}