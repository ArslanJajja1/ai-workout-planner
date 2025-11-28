import { isAxiosError } from "axios";

import { DEFAULT_ERROR_MESSAGE } from "@/constants/errors";
/**
 * Normalizes diverse errors (Axios, Error, strings) into a user-facing message.
 */
export function getRequestErrorMessage(error: unknown, fallback = DEFAULT_ERROR_MESSAGE) {
  if (isAxiosError<{ error?: string }>(error)) {
    const apiMessage = error.response?.data?.error;
    return apiMessage || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  }

  return fallback;
}


