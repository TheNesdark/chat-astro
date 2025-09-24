import supabase from "@/libs/Supabase"

interface User {
    email: string;
    password: string;
    username: string;
    publicUrl: string | null;
}

export async function signUp(user: User) {
    try {
        const { error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                data: {
                    display_name: user.username,
                    avatar_url: user.publicUrl || null
                }
            }
        });

        if (error) {
            throw error;
        }
        
    } catch (error) {
        throw error;
    }
}

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        throw error;
    }
    return data;
}

export async function signOut() : Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw error;
    }
}

export async function getCurrentUser(accessToken) {
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error) {
        throw error;
    }
    return data.user;
}

export async function refreshSession(refreshToken: string) {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (error) {
        throw error;
    }
    return data; 
}