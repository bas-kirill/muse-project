import React from "react";
import "./styles/NotFoundPage.css";
import { HeaderWidget } from "widgets/header";

export function NotFoundPage() {
  return (
    <>
      <HeaderWidget />
      <div id="not-found">Page not found :(</div>
    </>
  );
}

export default NotFoundPage;
