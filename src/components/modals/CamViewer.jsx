import { useEffect } from 'react';
import '@/styles/components/modals/CamViewer.css';
import cameraIcon from '@/assets/icons/camera-light-full.svg';
import closeIcon from '@/assets/icons/xmark-thin-full.svg';
import backIcon from '@/assets/icons/arrow-left-thin-full.svg';
import sendIcon from '@/assets/icons/file-arrow-down-thin-full.svg';

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
        <img src={cameraIcon.src} alt="camera" className="icon" />
      </button>
      <button id="btnClose">
        <img src={closeIcon.src} alt="close" className="icon" />
      </button>
      <div id="camControls">
        <button id="btnBack">
          <img src={backIcon.src} alt="back" className="icon" />
        </button>
        <button id="btnSend">
          <img src={sendIcon.src} alt="send" className="icon" />
        </button>
      </div>
    </dialog>
  );
};

export default CamViewer;
