import React from "react";
import styles from "./styles/NavigationBar.widget.module.css";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";
import { useTranslation } from "react-i18next";
import { I18N_NAVBAR_NEXT, I18N_NAVBAR_PREVIOUS } from "../../../i18n";

interface Props {
  totalPages: number;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

export const NavigationBarWidget = (props: Props) => {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`
      ${styles.navbar}
      ${darkMode && styles.navbar__dark}
    `}
    >
      <button
        className={`
          ${styles.navbar__button} 
          ${props.pageNumber === 1 && styles.navbar__non_clickable}
        `}
        onClick={() => props.setPageNumber(Math.max(1, props.pageNumber - 1))}
      >
        {t(I18N_NAVBAR_PREVIOUS)}
      </button>

      <button
        className={`
          ${styles.navbar__button} 
          ${props.pageNumber === props.totalPages && styles.navbar__non_clickable}
        `}
        onClick={() =>
          props.setPageNumber(Math.min(props.pageNumber + 1, props.totalPages))
        }
      >
        {t(I18N_NAVBAR_NEXT)}
      </button>
    </div>
  );
};
