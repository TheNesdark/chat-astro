

class UserManager {
    private static username: string | null = null;



    public static getUsername(): string | null {
        return this.username;
    }

    public static clearUsername() {
        this.username = null;
    }


}

export default UserManager;