import supabase from "@/libs/Supabase";

export async function uploadChatFile(file: File): Promise<{publicUrl: string; type: string; name: string }> {
    const filePath = `${Date.now()}_${file.name}`;
    const type = file.type;
    const name = file.name;

    const { error } = await supabase.storage
        .from('Files')
        .upload(filePath, file);

    if (error) {
        throw new Error(`Error subiendo archivo: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from('Files')
        .getPublicUrl(filePath);

    return { publicUrl, type, name};
}

export async function uploadAvatar(file: File): Promise<{publicUrl: string}> {
    const filePath = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
        .from('Avatar')
        .upload(filePath, file);

    if (error) {
        throw new Error(error.message);
    }

    const { data: { publicUrl } } = supabase.storage
        .from('Avatar')
        .getPublicUrl(filePath);
    return { publicUrl };
}