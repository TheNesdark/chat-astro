import { actions } from "astro:actions";

const form = document.getElementById("registerForm") as HTMLFormElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;

function showMessage(message: string, isError = true) {
  const el = document.getElementById("message") as HTMLParagraphElement;
  el.textContent = message;
  el.style.display = "block";
  isError ? el.classList.add("error") : el.classList.remove("error");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = e.target as HTMLFormElement;
  const email = data.email.value.trim();
  const password = data.password.value;
  const username = data.username.value.trim();

  if (!email || !password || !username) {
    showMessage("Email, contraseña y nombre de usuario son requeridos.");
    return;
  }
  if (password.length < 6) {
    showMessage("La contraseña debe tener al menos 6 caracteres.");
    return;
  }
  submitBtn.disabled = true;

  const formData = new FormData(data);

  try {
    // Desestructura la respuesta para manejar errores
    const { data, error }= await actions.register(formData);

    if (error) {
      // Si la Action lanza un error, muéstralo
      showMessage(error.message || "Error en el registro.", true);
      return;
    }

    if (data.success) {
      showMessage("Registro exitoso. Redirigiendo...", false);
      setTimeout(() => {
        window.location.href = "/Login";
      }, 1500);
    }
  } catch (err) {
    console.error("Error en fetch:", err);
    showMessage("Error en el registro.", true);
  } finally {
    submitBtn.disabled = false;
  }
});
