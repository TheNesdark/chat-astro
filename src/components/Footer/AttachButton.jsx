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
            alt="plus"
            className="icon"
          />
        </summary>
        <div className="attach-menu">
          <label htmlFor="fileInput" aria-label="Seleccionar archivo" onClick={handleFileSelect}>
            <img
              src="/icons/file-thin-full.svg"
              alt="file"
              className="icon"
            />
          </label>
          <button 
            id="BtnMicrophone" 
            type="button" 
            aria-label="Grabar audio" 
            className="btn-microphone"
            onClick={handleMicrophone}
          >
            <img
              src="/icons/microphone-thin-full.svg"
              alt="microphone"
              className="icon"
            />
          </button>
          <button 
            id="BtnCamera" 
            type="button" 
            aria-label="Abrir cámara" 
            className="btn-camera"
            onClick={handleCamera}
          >
            <img
              src="/icons/camera-light-full.svg"
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