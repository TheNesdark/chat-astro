const logoutButton = document.getElementById("logoutButton");
logoutButton?.addEventListener("click", async () => {
  try {
    const response = await fetch('/api/auth/signOut');
    if (response.ok) {
      window.location.href = '/Login'; 
    } else {
      console.error("Error al cerrar sesión");
    }
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
});