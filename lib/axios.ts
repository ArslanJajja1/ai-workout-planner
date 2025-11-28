import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { MAX_RETRIES } from "@/constants/runtime";

type RetriableConfig = InternalAxiosRequestConfig & { __retryCount?: number };


/**
 * Shared Axios instance that retries GETs and logs structured errors.
 */
const api = axios.create({
  baseURL: "/api",
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined;
    if (config && config.method === "get") {
      config.__retryCount = (config.__retryCount ?? 0) + 1;
      if (config.__retryCount <= MAX_RETRIES) {
        return api(config);
      }
    }
    console.error("[API Error]", normalizeAxiosError(error));
    return Promise.reject(error);
  },
);

function normalizeAxiosError(error: AxiosError) {
  return {
    status: error.response?.status,
    message: error.message,
    data: error.response?.data,
    url: error.config?.url,
  };
}

export default api;

