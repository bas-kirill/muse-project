import { jwtDecode } from "jwt-decode";
import { Role } from "./role";
import { COOKIE_JWT_KEY } from "shared/config/frontend";
import { deleteCookie, getCookie } from "shared/cookie/cookie";

interface JwtPayload {
  sub: string;
  role: Role;
  iat: number;
  exp: number; // UNIX seconds
}

export class Jwt {
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
    const jwtCookieRaw = getCookie(COOKIE_JWT_KEY);
    if (jwtCookieRaw === undefined) {
      return null;
    }
    return Jwt.from(jwtCookieRaw);
  }

  public static eraseFromCookie() {
    deleteCookie(COOKIE_JWT_KEY);
  }

  public static extractFromLocalStorage(): Jwt | null {
    const jwtRaw = window.localStorage.getItem(COOKIE_JWT_KEY);
    if (jwtRaw === null) {
      return null;
    }
    return Jwt.from(jwtRaw);
  }

  public static putToLocalStorage(jwtRaw: string) {
    window.localStorage.setItem(COOKIE_JWT_KEY, jwtRaw);
  }

  public static eraseFromLocalStorage() {
    window.localStorage.removeItem(COOKIE_JWT_KEY);
  }
}

export default Jwt;
