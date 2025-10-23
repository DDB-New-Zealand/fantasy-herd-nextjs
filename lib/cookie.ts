"use server";

import { User } from "@/stores/user-store";
import { cookies } from "next/headers";

const COOKIE_KEYS = {
  AUTH_TOKEN: "FANTASY_HERD_AUTH_TOKEN_MOCK",
  USER_DATA: "FANTASY_HERD_USER_MOCK",
};

// Server-side cookie functions (Next.js server components/API routes)
export const getServerCookie = async (name: string): Promise<string | null> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value || null;
};

export const setServerCookie = async (
  name: string,
  value: string,
  options?: {
    maxAge?: number;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
  }
) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
      maxAge: options?.maxAge || 30 * 24 * 60 * 60, // 30 days default
      httpOnly: options?.httpOnly || false,
      secure: options?.secure || process.env.NODE_ENV === "production",
      sameSite: options?.sameSite || "lax",
      path: "/",
      ...options,
    });
  } catch (error) {
    console.error("Failed to set server cookie:", error);
  }
};

export const deleteServerCookie = async (name: string) => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  } catch (error) {
    console.error("Failed to delete server cookie:", error);
  }
};

// Server-side authentication functions
export const getCurrentUserServer = async (): Promise<{
  authToken: string | null;
  userData: User | null;
}> => {
  const authToken = await getServerCookie(COOKIE_KEYS.AUTH_TOKEN);
  const userDataStr = await getServerCookie(COOKIE_KEYS.USER_DATA);

  let userData: User | null = null;
  if (userDataStr) {
    try {
      userData = JSON.parse(userDataStr);
    } catch (e) {
      console.error("Failed to parse user data from server cookie:", e);
    }
  }

  return { authToken, userData };
};

export const isUserLoggedInServer = async (): Promise<boolean> => {
  const { authToken, userData } = await getCurrentUserServer();
  return !!(authToken && userData);
};

export const logoutUserServer = async () => {
  await deleteServerCookie(COOKIE_KEYS.AUTH_TOKEN);
  await deleteServerCookie(COOKIE_KEYS.USER_DATA);
};

export const loginUserServer = async (username: string) => {
  // Mock login implementation
  const mockAuthToken = "mock-auth-token-123456";
  const mockUserData: User = {
    isLoggedIn: true,
    username: username,
  };

  await setServerCookie(COOKIE_KEYS.AUTH_TOKEN, mockAuthToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });

  await setServerCookie(COOKIE_KEYS.USER_DATA, JSON.stringify(mockUserData), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
};
