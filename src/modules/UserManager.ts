class UserManager {
    private static username: string | null = null;

    public static setUsername(username: string) {
        this.username = username;
        localStorage.setItem('username', username);
    }

    public static getUsername() {
        if (!this.username) {
            this.username = localStorage.getItem('username');
        }
        return this.username;
    }

    public static clearUsername() {
        this.username = null;
        localStorage.removeItem('username');
    }
}
export default UserManager;