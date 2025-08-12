import { AdminCredentials } from "@/types/quotation";
import { getAdminCredentials, saveAdminCredentials } from "./localStorage";

export const generateCredentials = (): AdminCredentials => {
  const username = `admin_${Math.random().toString(36).substr(2, 8)}`;
  const password = Math.random().toString(36).substr(2, 12);
  
  const credentials: AdminCredentials = {
    username,
    password,
    createdAt: new Date().toISOString()
  };
  
  saveAdminCredentials(credentials);
  return credentials;
};

export const validateLogin = (username: string, password: string): boolean => {
  // Check permanent credentials first
  if (username === "admin" && password === "Wood@12345") {
    return true;
  }
  
  // Fallback to generated credentials for backward compatibility
  const credentials = getAdminCredentials();
  if (!credentials) return false;
  
  return credentials.username === username && credentials.password === password;
};

export const getCurrentSession = (): string | null => {
  return sessionStorage.getItem("admin_session");
};

export const setSession = (token: string): void => {
  sessionStorage.setItem("admin_session", token);
};

export const clearSession = (): void => {
  sessionStorage.removeItem("admin_session");
};

export const isAuthenticated = (): boolean => {
  return getCurrentSession() !== null;
};