import { actions } from "astro:actions";
const form = document.getElementById('loginForm') as HTMLFormElement;
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = e.target as HTMLFormElement;
    const email = data.email.value;
    const password = data.password.value;

    if (!email || !password) {
        showMessage('Email y contraseña son requeridos.');
        return;
    }

    if (password.length < 6) {
        showMessage('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    const formData = new FormData(data);
    try {
        const { data, error } = await actions.login(formData);

        if (error) {
            showMessage(error.message || 'Error en el login.');
            return;
        }

        if (data?.success) {
            showMessage('Login exitoso. Redirigiendo...', false);
            window.location.href = '/';
        }
    } catch (err) {
        console.error('Error al ejecutar la Action:', err);
        showMessage('Ha ocurrido un error inesperado.');
    }
});

function showMessage(message, isError = true) {
    const el = document.getElementById('message');
    el.textContent = message;
    el.style.display = 'block';
    (isError ? el.classList.add('error') : el.classList.remove('error'));
}
