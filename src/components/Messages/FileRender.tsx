import React from 'react';
import type { FileRenderProps } from '@/types';

const FileRender: React.FC<FileRenderProps> = ({ fileUrl, fileType, fileName }) => {

    if (!fileUrl || !fileType) return null;

    // Render para imagen
    if (fileType.startsWith('image/')) {
        return (
                <img
                    src={fileUrl}
                    alt={fileName || 'Imagen'}
                    loading="lazy"
                    className={`file-image`}
                    title="Click para ampliar imagen"
                />
        );
    }

    // Render para video
    if (fileType.startsWith('video/')) {
        return (
                <video
                    src={fileUrl}
                    controls
                    className={`file-video`}
                />
            );
    }

    // Render para audio
    if (fileType.startsWith('audio/')) {
        return (
                <audio
                    src={fileUrl}
                    controls
                    className="file-audio"
                />
        );
    }

    // Render para otros archivos (link de descarga)
    return (
            <a
                href={fileUrl}
                download={fileName || 'archivo'}
                className="file-download-link"
            >
                <span>📎 {fileName || 'Descargar archivo'}</span>
            </a>
    );
};

export default FileRender;