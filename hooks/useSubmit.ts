import { useCallback, useState } from "react";
import useMounted from "./useMounted";
import useRefCallback from "./useRefCallback";

export interface UseSubmitOptions<T> {
  onSuccess?(data: T): void;
  onError?(error: string): void;
  onSubmit?(): void;
}

export default function useSubmit<
  F extends (...args: any[]) => Promise<T>,
  A extends Parameters<F>,
  T = F extends (...args: any[]) => Promise<infer U> ? U : unknown
>(submitter: F, { onSubmit, onSuccess, onError = console.error }: UseSubmitOptions<T> = {}) {
  const mounted = useMounted();
  const submitCallback = useRefCallback(submitter);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  const [result, setResult] = useState<T | undefined>(undefined);

  const submit = useCallback(async (...args: A) => {
    setLoading(true);
    setError("");

    if (onSubmit) {
      onSubmit();
    }

    try {
      const result = await submitCallback.current(...args);

      if (mounted.current) {
        setDone(true);
        setResult(result);
      }

      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (error) {
      if (mounted.current) {
        setError(error.message);
      }
      if (onError) {
        onError(error.message);
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, [mounted, onSubmit, onSuccess, onError]);

  const reset = useCallback(() => {
    setDone(false);
    setResult(undefined);
    setError("");
  }, []);

  return {
    loading,
    error,
    done,
    result,
    setError,
    submit,
    reset
  };
}