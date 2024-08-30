import React from "react";
import styles from "./styles/Footer.widget.module.css";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";
import { useTranslation } from "react-i18next";
import { I18N_FOOTER } from "../../../i18n";

export function FooterWidget() {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  return (
    <footer
      className={`
    ${styles.footer}
    ${darkMode && styles.footer__dark}
  `}
    >
      {t(I18N_FOOTER)}
    </footer>
  );
}

export default FooterWidget;
