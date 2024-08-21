import React, { useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { CATALOGUE, FAVORITE, HOME, LOGIN, PROFILE } from "shared/config/paths";
import { Cookies } from "typescript-cookie";
import { Jwt } from "domain/model/jwt";
import { Role } from "domain/model/role";

export function Header() {
  const jwt = useRef<string | undefined>(
    Cookies.get("jwt") as string | undefined,
  );

  return (
    <header>
      <nav>
        {jwt.current === undefined && (
          <div>
            <Link to={LOGIN}>Log in</Link>
          </div>
        )}

        {jwt.current !== undefined &&
          Jwt.from(jwt.current).toRole() === Role.Editor && (
            <div>
              <Link to={PROFILE}>Profile</Link>
            </div>
          )}
        <div>
          <Link to={FAVORITE}>Favorite</Link>
        </div>
        <div>
          <Link to={CATALOGUE}>Catalogue</Link>
        </div>
        <div>
          <Link to={HOME}>Home</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
