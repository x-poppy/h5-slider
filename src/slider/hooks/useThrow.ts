import { useState } from "react";

export function useThrowError() {
  const [error, throwError] = useState<Error | null>(null);
  if (error) {
    throw error;
  }
  return throwError;
}
