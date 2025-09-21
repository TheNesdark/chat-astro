
import type { APIRoute } from "astro";
import { signOut } from "@/services/Auth";
export const GET: APIRoute = async ({ cookies, redirect }) => {
  try {
    await signOut();
    cookies.delete("sb-access-token", { path: "/" });
    cookies.delete("sb-refresh-token", { path: "/" });
    return new Response("Signed out", { status: 200 });
    
  } catch (error) {
    console.error("Error during sign out:", error);
    return new Response("Error during sign out", { status: 500 });
  }

};