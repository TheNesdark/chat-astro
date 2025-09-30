import { useEffect } from 'react';
import '../../styles/camViewer.css';

const CamViewer = () => {
  useEffect(() => {
    // Importar y ejecutar el handler original
    import('/src/handlers/Files/CamHandler.ts').then((module) => {
      // El handler debería ejecutarse automáticamente cuando se importa
    });
  }, []);

  return (
    <dialog id="camModal">
      <video id="camVideo" hidden></video>
      <canvas id="camCanvas" hidden></canvas>
      <button id="btnCapture">
        <img src="/icons/camera-light-full.svg" alt="camera" className="icon" />
      </button>
      <button id="btnClose">
        <img src="/icons/xmark-thin-full.svg" alt="close" className="icon" />
      </button>
      <div id="camControls">
        <button id="btnBack">
          <img src="/icons/arrow-left-thin-full.svg" alt="back" className="icon" />
        </button>
        <button id="btnSend">
          <img src="/icons/file-arrow-down-thin-full.svg" alt="send" className="icon" />
        </button>
      </div>
    </dialog>
  );
};

export default CamViewer;