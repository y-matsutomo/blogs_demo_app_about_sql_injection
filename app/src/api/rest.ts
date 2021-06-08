import axios, { AxiosResponse } from "axios";

type Data = {
  [key: string]: string | number | boolean | Record<string, unknown>;
};

export const rest = (() => {
  const client = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 15000,
  });
  return {
    client,
    get: <T = any, R = AxiosResponse<T>>(
      url: string,
      params?: any
    ): Promise<R> => {
      return client.get(url, params);
    },
    post: <T = any, R = AxiosResponse<T>>(
      url: string,
      data: Data
    ): Promise<R> => {
      return client.post(url, data);
    },
  };
})();
