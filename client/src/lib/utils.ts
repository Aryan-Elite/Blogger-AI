import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple auth helpers for JWT storage and retrieval
export const auth = {
  getToken(): string | null {
    try {
      return localStorage.getItem("auth_token");
    } catch {
      return null;
    }
  },
  setToken(token: string) {
    try {
      localStorage.setItem("auth_token", token);
    } catch {
      // ignore storage errors
    }
  },
  clearToken() {
    try {
      localStorage.removeItem("auth_token");
    } catch {
      // ignore storage errors
    }
  },
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
