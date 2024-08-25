import React, { useRef } from "react";
import styles from "./styles/Header.widget.module.scss";
import { useNavigate } from "react-router-dom";
import { CATALOGUE, FAVORITE, HOME, LOGIN, PROFILE } from "shared/config/paths";
import { getCookie } from "shared/cookie/cookie";
import { COOKIE_JWT_KEY } from "shared/config/frontend";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";

export function HeaderWidget() {
  const { darkMode } = useDarkMode();

  const jwt = useRef<string | undefined>(getCookie(COOKIE_JWT_KEY));

  if (typeof document !== "undefined") {
    jwt.current = getCookie(COOKIE_JWT_KEY);
  }

  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <nav className={`
        ${styles.nav}
      `}>
        <button onClick={() => navigate(HOME)} className={`
          ${styles.nav__button}
          ${darkMode ? styles.btn__bg__dark : styles.btn__bg__light}
        `}>
          Home
        </button>
        <button onClick={() => navigate(CATALOGUE)} className={`
          ${styles.nav__button}
          ${darkMode ? styles.btn__bg__dark : styles.btn__bg__light}
        `}>
          Catalogue
        </button>
        {jwt.current !== undefined && (
          <button onClick={() => navigate(FAVORITE)} className={`
            ${styles.nav__button}
            ${darkMode ? styles.btn__bg__dark : styles.btn__bg__light}
          `}>Favorite</button>
        )}
        {jwt.current === undefined && (
          <button onClick={() => navigate(LOGIN)} className={`
            ${styles.nav__button}
            ${darkMode ? styles.btn__bg__dark : styles.btn__bg__light}
          `}>Login</button>
        )}
        {jwt.current !== undefined && (
          <button onClick={() => navigate(PROFILE)} className={`
            ${styles.nav__button}
            ${darkMode ? styles.btn__bg__dark : styles.btn__bg__light}
          `}>Profile</button>
        )}
      </nav>
    </header>
  );
}

export default HeaderWidget;
