import React, { useRef } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { CATALOGUE, FAVORITE, HOME, LOGIN, PROFILE } from "shared/config/paths";
import { Cookies } from "typescript-cookie";
import { Jwt } from "domain/model/jwt";
import { Role } from "domain/model/role";

export function Header() {
  const jwt = useRef<string | undefined>(
    Cookies.get("jwt") as string | undefined
  );

  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <button onClick={_ => navigate(HOME)}>Home</button>
        <button onClick={_ => navigate(CATALOGUE)}>Catalogue</button>
        <button onClick={_ => navigate(FAVORITE)}>Favorite</button>


        {jwt.current === undefined && (
          <button onClick={_ => navigate(LOGIN)}>Login</button>
        )
        }

        {jwt.current !== undefined &&
          Jwt.from(jwt.current).toRole() === Role.Editor && (
            <button onClick={_ => navigate(PROFILE)}>
              Profile
            </button>
          )}

      </nav>
    </header>
  );
}

export default Header;
