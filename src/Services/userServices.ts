import { buildApiUrl } from "./apiConfig";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  dateOfBirth: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

interface ServiceResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

async function parseResponseBody(response: Response): Promise<{
  json?: unknown;
  text: string;
  isJson: boolean;
}> {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();
  const isJson = contentType.includes("application/json");

  if (!isJson || !text) {
    return { text, isJson };
  }

  try {
    return { json: JSON.parse(text), text, isJson };
  } catch {
    return { text, isJson: false };
  }
}

async function postJson<TPayload, TResponse>(
  endpoint: string,
  payload: TPayload,
): Promise<ServiceResult<TResponse>> {
  try {
    const response = await fetch(buildApiUrl(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = await parseResponseBody(response);
    const data = body.json as TResponse | undefined;

    if (!response.ok) {
      const errorMessage =
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
          ? data.message
          : !body.isJson
            ? "Server returned HTML/non-JSON response. Check API URL and backend deployment."
            : "Request failed. Please try again.";

      return {
        success: false,
        error: errorMessage,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unable to reach the server.",
    };
  }
}

export async function loginUser(payload: LoginPayload) {
  return postJson<LoginPayload, LoginResponse>("/auth/login", payload);
}

export async function registerUser(payload: RegisterPayload) {
  return postJson<RegisterPayload, RegisterResponse>("/auth/register", payload);
}
