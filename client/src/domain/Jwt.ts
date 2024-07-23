import Role from "./Role";

interface Jwt {
    sub: string;
    role: Role;
    iat: number;
    exp: number;
}

class Jwt {
    static WINDOW_LOCAL_STORAGE_JWT_KEY = "jwt";

    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(jwtRaw: string): Jwt {
        return new Jwt(jwtRaw);
    }

    public static extractFromLocalStorage(): Jwt | null {
        const jwtRaw = window.localStorage.getItem(Jwt.WINDOW_LOCAL_STORAGE_JWT_KEY);
        if (jwtRaw == null) {
            return null;
        }
        return Jwt.from(jwtRaw);
    }

    public static putToLocalStorage(jwtRaw: string) {
        window.localStorage.setItem(Jwt.WINDOW_LOCAL_STORAGE_JWT_KEY, jwtRaw);
    }

    public toStringValue(): string {
        return this.value;
    }
}

export default Jwt;