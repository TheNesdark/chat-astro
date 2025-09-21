import type { APIRoute } from "astro";
import  { uploadChatFile } from "@/services/SupabaseServices";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const file: File | null = formData.get('file') as File;

    if (!file) {
      return new Response("No se encontró archivo", {
        status: 400,
      });
    }

    try {
        const { publicUrl, type, name } = await uploadChatFile(file);
        return new Response(JSON.stringify({ publicUrl, type, name }), { status: 200 });

    } catch (error) {
        return new Response("Error subiendo archivo: " + (error as Error).message, { status: 500 });
    }
}
