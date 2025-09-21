import CamHandler from "@/handlers/Files/CamHandler";
import MicHandler from "@/handlers/Files/MicHandler";
import FileHandler from "@/handlers/Files/FileHandler";

const attachButton = document.getElementById('attachButton');
const details = attachButton?.querySelector('details');
const fileInput = attachButton?.querySelector('input[type="file"]');
const btnMicrophone = attachButton?.querySelector('#BtnMicrophone');
const btnCamera = attachButton?.querySelector('#BtnCamera');

if (attachButton && details && fileInput && btnMicrophone && btnCamera) {
  document.addEventListener('click', (e) => {
    if (!attachButton.contains(e.target as Node)) {
      details.open = false;
    }
  });

  btnMicrophone.addEventListener('click', MicHandler);
  btnCamera.addEventListener('click', CamHandler);
  fileInput.addEventListener('change', FileHandler);
}
