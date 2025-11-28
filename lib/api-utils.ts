import { NextResponse } from "next/server";

export type ErrorPayload = { error: string };

/**
 * Returns a typed JSON error response consumed by the client.
 */
export const jsonError = (message: string, status = 500) =>
  NextResponse.json<ErrorPayload>({ error: message }, { status });

/**
 * Safely reads JSON from a request, guarding against malformed bodies.
 */
export async function readJsonBody<T>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}


