import React from "react";
import "./LogIn.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { Form, useActionData } from "react-router-dom";
import { LogInAction } from "../api/action";

export function LogIn() {
  const actionData = useActionData() as LogInAction;

  return (
    <div id="log-in">
      <Header />
      {actionData?.jwt && (
        <div className="successfull-login">
          ✅ Welcome, your role: {actionData?.jwt.toRole()}
        </div>
      )}

      {!actionData?.jwt && (
        <Form method="post">
          <input type="text" name="login" placeholder={"Login"} />
          <input type="text" name="password" placeholder={"Password"} />
          <input type="submit" value="Log In" />
          {actionData?.errors && (
            <div className="erroneous-login">
              {actionData?.errors.map((error) => <div key={error}>{error}</div>)}
            </div>
          )}
        </Form>
      )}
      <Footer />
    </div>
  );
}

export default LogIn;
