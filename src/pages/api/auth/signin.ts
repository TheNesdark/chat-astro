import type { APIRoute } from "astro";
import { signIn } from "@/services/Auth";

export const POST: APIRoute = async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return new Response(JSON.stringify({ error: "Datos requeridos" }), { status: 400 });
    }

    try {
        const data = await signIn(email, password);  // Usa tu Auth.ts

        if (!data.session) {
            return new Response(JSON.stringify({ error: "No sesión" }), { status: 500 });
        }

        // Setea cookies con nombres como en index.astro
        cookies.set("sb-access-token", data.session.access_token, {
            httpOnly: false,
            secure: import.meta.env.PROD,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24
        });

        cookies.set("sb-refresh-token", data.session.refresh_token, {
            httpOnly: false,
            secure: import.meta.env.PROD,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });

        return new Response(JSON.stringify({ 
            success: true, 
            user: { id: data.user.id, email: data.user.email, username: data.user.user_metadata?.display_name } 
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 401 });
    }
};