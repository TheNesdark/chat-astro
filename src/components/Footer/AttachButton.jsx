<<<<<<< HEAD
import useAttachButton from '@/hooks/useAttachButton';
import plusIcon from '@/assets/icons/plus-solid-full.svg';
import fileIcon from '@/assets/icons/file-thin-full.svg';
import micIcon from '@/assets/icons/microphone-thin-full.svg';
import cameraIcon from '@/assets/icons/camera-light-full.svg';

const AttachButton = () => {
  const { detailsRef, fileInputRef, attachButtonRef, handleFileChange, handleMicrophone, handleCamera } = useAttachButton();

  return (
    <div className="attach-button" id="attachButton" ref={attachButtonRef}>
      <input type="file" id="fileInput" name="file" hidden ref={fileInputRef} onChange={handleFileChange} />
      <details ref={detailsRef}>
        <summary>
          <img
            src={plusIcon.src}
=======
import { useEffect, useRef } from 'react';

const AttachButton = () => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Importar y ejecutar el handler original
    import('/src/handlers/Components/AttachButtonHandler.ts').then((module) => {
      // El handler debería ejecutarse automáticamente cuando se importa
    });
  }, []);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleMicrophone = () => {
    const micButton = document.getElementById('BtnMicrophone');
    if (micButton) {
      micButton.click();
    }
  };

  const handleCamera = () => {
    const cameraButton = document.getElementById('BtnCamera');
    if (cameraButton) {
      cameraButton.click();
    }
  };

  return (
    <div className="attach-button" id="attachButton">
      <input type="file" id="fileInput" name="file" hidden ref={fileInputRef} />
      <details>
        <summary>
          <img
            src="/icons/plus-solid-full.svg"
>>>>>>> f078b9f9eede162aaba107090a524feb4955d5fe
            alt="plus"
            className="icon"
          />
        </summary>
        <div className="attach-menu">
<<<<<<< HEAD
          <label htmlFor="fileInput" aria-label="Seleccionar archivo">
            <img
              src={fileIcon.src}
=======
          <label htmlFor="fileInput" aria-label="Seleccionar archivo" onClick={handleFileSelect}>
            <img
              src="/icons/file-thin-full.svg"
>>>>>>> f078b9f9eede162aaba107090a524feb4955d5fe
              alt="file"
              className="icon"
            />
          </label>
          <button 
<<<<<<< HEAD
=======
            id="BtnMicrophone" 
>>>>>>> f078b9f9eede162aaba107090a524feb4955d5fe
            type="button" 
            aria-label="Grabar audio" 
            className="btn-microphone"
            onClick={handleMicrophone}
          >
            <img
<<<<<<< HEAD
              src={micIcon.src}
=======
              src="/icons/microphone-thin-full.svg"
>>>>>>> f078b9f9eede162aaba107090a524feb4955d5fe
              alt="microphone"
              className="icon"
            />
          </button>
          <button 
<<<<<<< HEAD
=======
            id="BtnCamera" 
>>>>>>> f078b9f9eede162aaba107090a524feb4955d5fe
            type="button" 
            aria-label="Abrir cámara" 
            className="btn-camera"
            onClick={handleCamera}
          >
            <img
<<<<<<< HEAD
              src={cameraIcon.src}
=======
              src="/icons/camera-light-full.svg"
>>>>>>> f078b9f9eede162aaba107090a524feb4955d5fe
              alt="camera"
              className="icon"
            />
          </button>
        </div>
      </details>
    </div>
  );
};

export default AttachButton;