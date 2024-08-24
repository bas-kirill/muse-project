import React, { useRef } from "react";
import "./styles/HeaderWidget.css";
import { useNavigate } from "react-router-dom";
import { CATALOGUE, FAVORITE, HOME, LOGIN, PROFILE } from "shared/config/paths";
import { Cookies } from "typescript-cookie";
import { Jwt } from "domain/model/jwt";
import { Role } from "domain/model/role";

export function HeaderWidget() {
  const jwt = useRef<string | undefined>(undefined);

  if (typeof document !== "undefined") {
    jwt.current = Cookies.get("jwt") as string | undefined;
  }

  const navigate = useNavigate();

  return (
    <header>
      <nav>
        {/* prettier-ignore */}
        {/* eslint-disable-next-line */}
        <button onClick={(_) => navigate(HOME)}>Home</button>
        {/* prettier-ignore */}
        {/* eslint-disable-next-line */}
        <button onClick={(_) => navigate(CATALOGUE)}>Catalogue</button>
        {/* prettier-ignore */}
        {/* eslint-disable-next-line */}
        <button onClick={(_) => navigate(FAVORITE)}>Favorite</button>
        {jwt.current === undefined && (
          <>
            {/* prettier-ignore */}
            {/* eslint-disable-next-line */}
            <button onClick={(_) => navigate(LOGIN)}>Login</button>
          </>
        )}
        {jwt.current !== undefined &&
          Jwt.from(jwt.current).toRole() === Role.Editor && (
            <>
              {/* prettier-ignore */}
              {/* eslint-disable-next-line */}
              <button onClick={(_) => navigate(PROFILE)}>Profile</button>
            </>
          )}
      </nav>
    </header>
  );
}

export default HeaderWidget;
