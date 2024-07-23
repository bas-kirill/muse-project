import {jwtDecode} from "jwt-decode";
import Role from "./Role";

interface Jwt {
    sub: string;
    role: Role;
    iat: number;
    exp: number;
}

class Jwt {
    static WINDOW_LOCAL_STORAGE_JWT_KEY = "jwt";

    sub: string;
    role: Role;
    iat: number;
    exp: number;

    private constructor(sub: string, role: Role, iat: number, exp: number) {
        this.sub = sub;
        this.role = role;
        this.iat = iat;
        this.exp = exp;
    }

    public static from(jwtRaw: string): Jwt {
        const jwt = jwtDecode<Jwt>(jwtRaw)

        let role: Role;
        if (jwt.role === Role.User) {
            role = Role.User;
        } else if (jwt.role === Role.Editor) {
            role = Role.Editor;
        } else {
            throw new Error(`Unknown role '${jwt.role}'`)
        }

        return new Jwt(jwt.sub, role, jwt.iat, jwt.exp);
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
}

export default Jwt;