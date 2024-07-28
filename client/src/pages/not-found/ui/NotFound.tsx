import React from "react";
import "./NotFound.css";
import { Header } from "widgets/header";

export function NotFound() {
  return (
    <>
      <Header />
      <div id="not-found">Page not found :(</div>
    </>
  );
}

export default NotFound;
