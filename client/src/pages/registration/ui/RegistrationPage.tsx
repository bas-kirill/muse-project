import React from "react";
import "./styles/RegistrationPage.css";
import { HeaderWidget } from "widgets/header";
import { Form, useActionData } from "react-router-dom";
import { FooterWidget } from "widgets/footer";
import { RegistrationAction } from "pages/registration/api/action";

export const RegistrationPage = () => {
  const actionData = useActionData() as RegistrationAction;

  return (
    <div id="registration-page">
      <HeaderWidget />

      {actionData?.errors.length === 0 && (
        <div className="successfull-registration">
          ✅ Registration Completed
        </div>
      )}

      <Form method="POST">
        <input type="text" name="fullName" placeholder={"Full Name"} />
        <input type="text" name="login" placeholder={"Login"} />
        <input type="password" name="password" placeholder={"Password"} />
        <input type="submit" value="Registration" />
        {actionData?.errors.length > 0 && (
          <div className="erroneous-registration">
            {actionData?.errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        )}
      </Form>
      <FooterWidget />
    </div>
  );
};
