import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * 獲取 API 的基礎 URL
 * 在服務器端(getServerSideProps)使用時會自動檢測環境
 */
export function getBaseUrl(): string {
  // 1. 如果有設置 NEXT_PUBLIC_BASE_URL,使用它
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // 2. 在 Vercel 上,使用 VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3. 在瀏覽器中,使用當前 origin
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // 4. 最後回退到 localhost (僅用於本地開發)
  return "http://localhost:3000";
}
