import React from "react";
import styles from "./styles/Footer.widget.module.css";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";

export function FooterWidget() {
  const { darkMode } = useDarkMode();

  return <footer className={`
    ${styles.footer}
    ${darkMode && styles.footer__dark}
  `}>Muse Group Frontend Academy
  </footer>;
}

export default FooterWidget;
