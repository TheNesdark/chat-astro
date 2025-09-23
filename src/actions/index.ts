
import { defineAction } from 'astro:actions';
import { z } from 'zod'; // Corregido: Zod se importa de 'zod'
import { uploadChatFile , uploadAvatar } from "@/services/SupabaseServices";
import { signIn, signUp , signOut} from "@/services/Auth";

export const server = {
  // Action para subir archivos
  uploadFile: defineAction({
    accept: 'form',
    input: z.object({
      file: z.instanceof(File),
    }),
    handler: async ({ file }) => {
      try {
        const { publicUrl, type, name } = await uploadChatFile(file);
        return { publicUrl, type, name };
      } catch (error) {
        throw new Error("Error al subir el archivo: " + (error as Error).message);
      }
    },
  }),

  // Action para login
  login: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    handler: async ({ email, password }, { cookies }) => {

      try {
        const data = await signIn(email, password);
      if (!data || !data.session) {
        throw new Error("Credenciales inválidas o error en el servidor.");
      }
      cookies.set("sb-access-token", data.session.access_token, {
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 // 1 día
      });

      cookies.set("sb-refresh-token", data.session.refresh_token, {
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7 // 7 días
      });
      return { success: true };
      } catch (error) {
        throw new Error("Error al iniciar sesión: " + (error as Error).message);
      }
    },
  }),

  // Action para registro
  register: defineAction({
    accept: 'form',
    input: z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
      avatar: z.instanceof(File).optional(),
    }),
    handler: async ({ username, email, password, avatar }) => {
      console.log(username, email, password, avatar);
      try {
        let publicUrl: string | null = null;
        if (avatar && avatar.size > 0) {
          const result = await uploadAvatar(avatar);
          publicUrl = result.publicUrl;
        }
        await signUp({ email, password, username, publicUrl });
        return { success: true };
      } catch (error) {
        throw new Error("Error en el registro: " + (error as Error).message);
      }
    },
  }),

  // Action para logout
  logout: defineAction({
    handler: async ({}, { cookies }) => {
      try {
        await signOut();
        cookies.delete("sb-access-token");
        cookies.delete("sb-refresh-token");
        return { success: true };
      } catch (error) {
        throw new Error("Error al cerrar sesión: " + (error as Error).message);
      }
    },
  }),

};
