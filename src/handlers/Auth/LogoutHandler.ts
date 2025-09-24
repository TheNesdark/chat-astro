import { actions } from "astro:actions";
const Logout = document.getElementById("logoutButton");
Logout?.addEventListener("click", async () => {
    const { data, error } = await actions.logout({});
    if (error) {
        console.error(error);
        return;
    }
    window.location.href = "/Login";
});
