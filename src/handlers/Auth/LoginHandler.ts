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
        const response = await fetch('/api/auth/signIn', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            showMessage('Login exitoso. Redirigiendo...', false);
            window.location.href = '/';
            return;

        } else {

            const errorText = await response.text();
            showMessage(errorText || 'Error en el login.');
        }
    } catch (err) {
        console.error('Error en fetch:', err);
    }
});

function showMessage(message, isError = true) {
    const el = document.getElementById('message');
    el.textContent = message;
    el.style.display = 'block';
    (isError ? el.classList.add('error') : el.classList.remove('error'));
}
