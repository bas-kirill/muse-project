import React from "react";
import styles from "./styles/Login.page.module.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { LogInAction } from "../api/action";
import { REGISTRATION_URL } from "shared/config/paths";

export function LoginPage() {
  const actionData = useActionData() as LogInAction;
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate(REGISTRATION_URL);
  };

  return (
    <>
      <HeaderWidget />

      {actionData?.errors.length === 0 && (
        <div className={styles.login__ok}>✅ Welcome!</div>
      )}

      <Form method="post" className={styles.login__form}>
        <input type="text" name="login" placeholder={"Login"} />
        <input type="password" name="password" placeholder={"Password"} />
        <input type="submit" value="Login" />
        <input
          type="button"
          value="Registration"
          onClick={handleRegisterRedirect}
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
