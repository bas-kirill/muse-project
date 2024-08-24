import React from "react";
import styles from "./styles/Registration.page.module.css";
import { HeaderWidget } from "widgets/header";
import { Form, useActionData } from "react-router-dom";
import { FooterWidget } from "widgets/footer";
import { RegistrationAction } from "pages/registration/api/action";

export const RegistrationPage = () => {
  const actionData = useActionData() as RegistrationAction;

  return (
    <>
      <HeaderWidget />

      {actionData?.errors.length === 0 && (
        <div className={styles.registration__ok}>✅ Registration Completed</div>
      )}

      <Form method="POST" className={styles.registration__form}>
        <input type="text" name="fullName" placeholder={"Full Name"} />
        <input type="text" name="login" placeholder={"Login"} />
        <input type="password" name="password" placeholder={"Password"} />
        <input type="submit" value="Registration" />
        {actionData?.errors.length > 0 && (
          <div className={styles.registration__error}>
            {actionData?.errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        )}
      </Form>

      <FooterWidget />
    </>
  );
};
