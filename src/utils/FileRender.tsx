export interface File {
    buffer: ArrayBuffer;
    type: string;
    name: string;
}

class FileRender {
    private static buffertoUrl(buffer: ArrayBuffer, type: string) {
        const blob = new Blob([buffer], { type });
        return URL.createObjectURL(blob);
    }

    public static renderMedia(file: File) {
        if (file.buffer && file.type) {
            const url = FileRender.buffertoUrl(file.buffer, file.type);
            if (file.type.startsWith("image/")) {
                return <img src={url} alt={file.name || "imagen"} />;
            } else if (file.type.startsWith("video/")) {
                return <video src={url} controls />;
            } else if (file.type.startsWith("audio/")) {
                return <audio src={url} controls />;
            } else {
                return (
                    <a href={url} download={file.name || "archivo"}>
                        {file.name || "Descargar archivo"}
                    </a>
                );
            }
        }
    }
}

export default FileRender;