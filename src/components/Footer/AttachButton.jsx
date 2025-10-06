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
            alt="plus"
            className="icon"
          />
        </summary>
        <div className="attach-menu">
          <label htmlFor="fileInput" aria-label="Seleccionar archivo">
            <img
              src={fileIcon.src}
              alt="file"
              className="icon"
            />
          </label>
          <button 
            type="button" 
            aria-label="Grabar audio" 
            className="btn-microphone"
            onClick={handleMicrophone}
          >
            <img
              src={micIcon.src}
              alt="microphone"
              className="icon"
            />
          </button>
          <button 
            type="button" 
            aria-label="Abrir cámara" 
            className="btn-camera"
            onClick={handleCamera}
          >
            <img
              src={cameraIcon.src}
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
