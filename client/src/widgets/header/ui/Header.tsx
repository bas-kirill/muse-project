import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Jwt } from "domain/";
import { CATALOGUE, FAVORITE, HOME, LOGIN, PROFILE } from "shared/config/paths";

export function Header() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const jwtRaw = window.localStorage.getItem(
      Jwt.WINDOW_LOCAL_STORAGE_JWT_KEY,
    );
    if (jwtRaw == null) {
      setAuthenticated(false);
      return;
    }

    setAuthenticated(true);
  });

  return (
    <header>
      <nav>
        {!authenticated && (
          <div>
            <Link to={LOGIN}>Log in</Link>
          </div>
        )}
        {authenticated && (
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
