import supabase from "@/libs/Supabase"

export async function signUp(email: string, password: string, username: string) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    display_name: username
                }
            }
        });

        if (error) {
            console.error("Error en el registro:", error);
            throw error;
        }
        
    } catch (error) {
        console.error("Error en el registro:", error);
        throw error;
    }
}

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    
    if (error) {
        console.error("Error en el login:", error);
        throw error;
    }
    return data;
}

export async function signOut() : Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error en el cierre de sesión:", error);
        throw error;
    }
}

export async function getCurrentUser(accessToken) {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error("Error al obtener el usuario actual:", error);
        throw error;
    }
    return data.user;
}

export async function refreshSession(refreshToken: string) {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (error) {
        console.error("Error refrescando sesión:", error);
        throw error;
    }
    return data; 
}