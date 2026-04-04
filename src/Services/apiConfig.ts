const DEFAULT_API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://randomblog.grancharovstoyan.deno.net"
    : "http://localhost:4200";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || DEFAULT_API_BASE_URL;

export function buildApiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
