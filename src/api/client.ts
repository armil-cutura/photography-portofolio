/**
 * API client for ASP.NET Core backend.
 *
 * Set VITE_API_URL in your .env to point at your API.
 * The Vite dev server proxies /api/* to that URL automatically (see vite.config.ts).
 *
 * Usage:
 *   import { api } from "@/api/client";
 *   const data = await api.get<UserDto[]>("/api/users");
 *   await api.post("/api/contact", { name, email, message });
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message ?? `${status} ${statusText}`);
    this.name = "ApiError";
  }
}

async function request<T = unknown>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options?.headers as Record<string, string>),
  };

  const res = await fetch(endpoint, { ...options, headers });

  if (!res.ok) {
    let message: string | undefined;
    try {
      const body = await res.json();
      message = body?.title ?? body?.message ?? undefined;
    } catch {
      // ignore parse errors
    }
    throw new ApiError(res.status, res.statusText, message);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { method: "DELETE", ...options }),
};
