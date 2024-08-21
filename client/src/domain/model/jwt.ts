import { jwtDecode } from "jwt-decode";
import { Role } from "./role";
import { Cookies } from "typescript-cookie";

interface JwtPayload {
  sub: string;
  role: Role;
  iat: number;
  exp: number; // UNIX seconds
}

export class Jwt {
  public static readonly COOKIE_JWT_KEY = "jwt";

  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public toStringValue(): string {
    return this.value;
  }

  public toRole(): Role {
    return jwtDecode<JwtPayload>(this.value).role;
  }

  public expired(): boolean {
    const nowSeconds = Math.floor(Date.now() / 1000);
    return jwtDecode<JwtPayload>(this.value).exp < nowSeconds;
  }

  public static from(jwtRaw: string): Jwt {
    return new Jwt(jwtRaw);
  }

  public static extractFromCookie(): Jwt | null {
    const jwtCookieRaw = Cookies.get(Jwt.COOKIE_JWT_KEY) as string | undefined;
    if (jwtCookieRaw === undefined) {
      return null;
    }
    return Jwt.from(jwtCookieRaw);
  }

  public static eraseFromCookie() {
    Cookies.remove(Jwt.COOKIE_JWT_KEY)
  }

  public static extractFromLocalStorage(): Jwt | null {
    const jwtRaw = window.localStorage.getItem(
      Jwt.COOKIE_JWT_KEY,
    );
    if (jwtRaw === null) {
      return null;
    }
    return Jwt.from(jwtRaw);
  }

  public static putToLocalStorage(jwtRaw: string) {
    window.localStorage.setItem(Jwt.COOKIE_JWT_KEY, jwtRaw);
  }

  public static eraseFromLocalStorage() {
    window.localStorage.removeItem(Jwt.COOKIE_JWT_KEY);
  }
}

export default Jwt;
