import UserManager from "@/modules/UserManager";
const form = document.getElementById('usernameForm') as HTMLFormElement;
const input = document.getElementById('usernameInput') as HTMLInputElement;
const error = document.getElementById('error')as HTMLParagraphElement;

if (UserManager.getUsername()) {
    window.location.href = '/';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = input.value.trim();
    if (username.length < 3) {
        error.textContent = 'Username debe tener al menos 3 caracteres.';
        error.style.display = 'block';
        return;
    }

    UserManager.setUsername(username);
    console.log('Username guardado:', username);
    window.location.href = '/';
});
