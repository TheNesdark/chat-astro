import { useEffect, useRef } from 'react';
import MicrophoneHandler from '@/handlers/Files/MicHandler';
import CameraHandler from '@/handlers/Files/CamHandler';
import FileHandler from '@/handlers/Files/FileHandler';

export default function useAttachButton() {
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const attachButtonRef = useRef<HTMLDivElement>(null);

    const updateRecordingState = (recording: boolean) => {
        if (attachButtonRef.current) {
            attachButtonRef.current.classList.toggle('recording', recording);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        FileHandler.handleFileSelection(e.nativeEvent);
    };

    const handleMicrophone = async () => {
        await MicrophoneHandler.startRecording(updateRecordingState);
    };

    const handleCamera = () => {
        CameraHandler.open();
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (detailsRef.current && !detailsRef.current.contains(e.target as Node)) {
            detailsRef.current.open = false;
        }
    };


    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return {
        detailsRef,
        fileInputRef,
        attachButtonRef,
        handleFileChange,
        handleMicrophone,
        handleCamera,
    };
}
