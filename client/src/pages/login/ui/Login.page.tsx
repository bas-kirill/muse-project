import React from "react";
import styles from "./styles/Login.page.module.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { LoginAction } from "../api/action";
import { REGISTRATION_URL } from "shared/config/paths";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";

export function LoginPage() {
  const {darkMode} = useDarkMode();
  const actionData = useActionData() as LoginAction;
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate(REGISTRATION_URL);
  };

  return (
    <>
      <HeaderWidget />

      <Form method="post" className={`
        ${styles.login__form}
        ${darkMode && styles.login__form__dark}
      `}>
        <input type="text" name="login" placeholder={"Login..."} className={styles.login__form__input__dark} />
        <input type="password" name="password" placeholder={"Password..."} className={styles.login__form__input__dark} />
        <input type="submit" value="Login" className={styles.login__form__input__dark} />
        <input
          type="button"
          value="Registration"
          onClick={handleRegisterRedirect}
          className={styles.login__form__input__dark}
        />
        {actionData?.errors.length > 0 && (
          <div className={styles.login__error}>
            {actionData?.errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        )}
      </Form>

      <FooterWidget />
    </>
  );
}

export default LoginPage;
