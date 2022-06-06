import { useEffect, useState } from "react";

export function useAsyncEffect(callback?: CallableFunction, deps?: any[], isThrowErr?: boolean) {
  isThrowErr ??= true; 
  deps ??= [];
  const [error, throwError] = useState<any>(null);
  if (error && isThrowErr) {
    throw error;
  }

  useEffect(() => {
    if (!callback) {
      return;
    }
    
    callback(async () => {
      try {
        await callback();
      } catch (err) {
        throwError(err);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps]);
}
