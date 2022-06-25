import React, { ReactNode, useContext, useMemo } from "react";

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useInitialConfig } from "./useInitialConfig";

const mockAdapter = async (cfg: AxiosRequestConfig) => {
  const mockUrl = cfg.headers?.['x-mock-url'] as string;
  if (!mockUrl) {
    throw new Error('Mock url is empty!');
  }

  const results = await fetch(mockUrl as string);
  const data = await results.json();
  return {
    data,
    status: results.status,
    statusText: results.statusText,
    headers: results.headers,
    config: cfg,
    request: {},
  };
};

interface HttpClientOpts {
  mock?: boolean;
  baseURL?: string;
}

export function createHttpClient(opts: HttpClientOpts) {
  return axios.create({
    baseURL: opts.baseURL,
    adapter: (opts.mock ? mockAdapter : undefined) as any,
  });
}

const HttpClientContext = React.createContext<AxiosInstance>(null as unknown as any);

export interface HttpClientProviderProps {
  children?: ReactNode
}

export function HttpClientProvider(props: HttpClientProviderProps) {
  const initialConfig = useInitialConfig();

  const httpClient = useMemo<AxiosInstance>(() => {
    return createHttpClient({
      mock: !!(initialConfig.mock)
    });
  // eslint-disable-next-line 
  }, []);

  return (
    <HttpClientContext.Provider value={httpClient}>
      { props.children }
    </HttpClientContext.Provider>
  );
}

export function useHttpClient() {
  return useContext(HttpClientContext)
}
