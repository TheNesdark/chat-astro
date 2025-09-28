import React, { useState } from 'react';
interface FileRenderProps {
    fileUrl: string;
    fileType: string;
    fileName?: string;
}

const FileRender: React.FC<FileRenderProps> = ({ fileUrl, fileType, fileName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
 
    if (!fileUrl || !fileType) return null;

    // Render para imagen 
    if (fileType.startsWith('image/')) {
        return (
            <>
                <img 
                    src={fileUrl} 
                    alt={fileName || 'Imagen'} 
                    loading="lazy" 
                    onClick={() => setIsModalOpen(true)}
                    className="clickable-image"
                    title="Click para ampliar imagen"
                />
            </>
        );
    }

    // Render para video
    if (fileType.startsWith('video/')) {
        return <video src={fileUrl} controls />;
    }

    // Render para audio
    if (fileType.startsWith('audio/')) {
        return <audio src={fileUrl} controls />;
    }

    // Render para otros archivos (link de descarga)
    return (
        <a href={fileUrl} download={fileName || 'archivo'} className="file-link">
            📎 {fileName || 'Descargar archivo'}
        </a>
    );
};

export default FileRender;