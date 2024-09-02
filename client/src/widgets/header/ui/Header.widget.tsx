import React, { useRef } from "react";
import styles from "./styles/Header.widget.module.scss";
import { useNavigate } from "react-router-dom";
import { CATALOGUE, FAVORITE, HOME, LOGIN, PROFILE } from "shared/config/paths";
import { getCookie } from "shared/cookie/cookie";
import { COOKIE_JWT_KEY } from "shared/config/frontend";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";
import {
  I18N_HEADER_CATALOGUE_BUTTON,
  I18N_HEADER_FAVORITE_BUTTON,
  I18N_HEADER_HOME_BUTTON,
  I18N_HEADER_LOGIN_BUTTON,
  I18N_HEADER_PROFILE_BUTTON,
} from "../../../i18n";
import { useTranslation } from "react-i18next";

export function HeaderWidget() {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  const jwt = useRef<string | undefined>(getCookie(COOKIE_JWT_KEY));

  if (typeof document !== "undefined") {
    jwt.current = getCookie(COOKIE_JWT_KEY);
  }

  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <nav
        className={`
        ${styles.nav}
      `}
      >
        <button
          onClick={() => navigate(HOME)}
          className={`
          ${styles.nav__button}
          ${darkMode ? styles.btn__bg__dark : styles.btn__bg__light}
        `}
        >
          {t(I18N_HEADER_HOME_BUTTON)}
        </button>
        <button
          onClick={() => navigate(CATALOGUE)}
          className={`
          ${styles.nav__button}
          ${darkMode ? styles.btn__bg__dark : styles.btn__bg__light}
        `}
        >
          {t(I18N_HEADER_CATALOGUE_BUTTON)}
        </button>
        {jwt.current !== undefined && (
          <button
            onClick={() => navigate(FAVORITE)}
            className={`
            ${styles.nav__button}
            ${darkMode ? styles.btn__bg__dark : styles.btn__bg__light}
          `}
          >
            {t(I18N_HEADER_FAVORITE_BUTTON)}
          </button>
        )}
        {jwt.current === undefined && (
          <button
            onClick={() => navigate(LOGIN)}
            className={`
            ${styles.nav__button}
            ${darkMode ? styles.btn__bg__dark : styles.btn__bg__light}
          `}
          >
            {t(I18N_HEADER_LOGIN_BUTTON)}
          </button>
        )}
        {jwt.current !== undefined && (
          <button
            onClick={() => navigate(PROFILE)}
            className={`
            ${styles.nav__button}
            ${darkMode ? styles.btn__bg__dark : styles.btn__bg__light}
          `}
          >
            {t(I18N_HEADER_PROFILE_BUTTON)}
          </button>
        )}
      </nav>
    </header>
  );
}

export default HeaderWidget;
