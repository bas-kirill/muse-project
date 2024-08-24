import React from "react";
import styles from "./styles/NotFoundPage.module.css";
import { HeaderWidget } from "widgets/header";

export function NotFoundPage() {
  return (
    <>
      <HeaderWidget />
      <div className={styles.not_found}>Page not found :(</div>
    </>
  );
}

export default NotFoundPage;
