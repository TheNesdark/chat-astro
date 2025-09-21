import type { APIRoute } from "astro";
import { signUp } from "@/services/Auth";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();

  if (!email || !password || !username) {
    return new Response("Email, contraseña y nombre de usuario son requeridos", { status: 400 });
  }

  try {
    await signUp(email, password, username);
  } catch (error) {
    return new Response("Error en el registro: " + (error as Error).message, { status: 500 });
  }

  return new Response("Usuario registrado.", { status: 200 });
};