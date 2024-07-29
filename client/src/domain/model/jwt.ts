import { jwtDecode } from "jwt-decode";
import { Role } from "./role";

interface JwtPayload {
  sub: string;
  role: Role;
  iat: number;
  exp: number;  // UNIX seconds
}

export class Jwt {
  public static readonly WINDOW_LOCAL_STORAGE_JWT_KEY = "jwt";

  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public toStringValue(): string {
    return this.value;
  }

  public toRole(): string {
    return jwtDecode<JwtPayload>(this.value).role;
  }

  public expired(): boolean {
    const nowSeconds  = Math.floor(Date.now() / 1000);
    return jwtDecode<JwtPayload>(this.value).exp < nowSeconds;
  }

  public static from(jwtRaw: string): Jwt {
    return new Jwt(jwtRaw);
  }

  public static extractFromLocalStorage(): Jwt | null {
    const jwtRaw = window.localStorage.getItem(
      Jwt.WINDOW_LOCAL_STORAGE_JWT_KEY
    );
    if (jwtRaw == null) {
      return null;
    }
    return Jwt.from(jwtRaw);
  }

  public static putToLocalStorage(jwtRaw: string) {
    window.localStorage.setItem(Jwt.WINDOW_LOCAL_STORAGE_JWT_KEY, jwtRaw);
  }

  public static eraseFromLocalStorage() {
    window.localStorage.removeItem(Jwt.WINDOW_LOCAL_STORAGE_JWT_KEY);
  }
}

export default Jwt;
