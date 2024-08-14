import React from "react";
import "./RegistrationPage.css";
import { Header } from "widgets/header";
import { Form, useActionData } from "react-router-dom";
import { Footer } from "widgets/footer";
import { RegistrationAction } from "pages/registration/api/action";

export const RegistrationPage = () => {
  const actionData = useActionData() as RegistrationAction;

  return (
    <div id="registration-page">
      <Header />

      {actionData?.errors.length === 0 && (
        <div className="successfull-registration">
          ✅ Registration Completed
        </div>
      )}

      <Form method="POST">
        <input type="text" name="name" placeholder={"Name"} />
        <input type="text" name="surname" placeholder={"Surname"} />
        <input type="text" name="login" placeholder={"Login"} />
        <input type="password" name="password" placeholder={"Password"} />
        <input type="submit" value="Registration" />
        {actionData?.errors.length > 0 && (
          <div className="erroneous-registration">
            {actionData?.errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        )}
      </Form>
      <Footer />
    </div>
  );
};
