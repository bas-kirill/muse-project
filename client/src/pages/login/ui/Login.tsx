import React from "react";
import "./Login.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { LogInAction } from "../api/action";
import { REGISTRATION_URL } from "shared/config/paths";

export function Login() {
  const actionData = useActionData() as LogInAction;
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate(REGISTRATION_URL);
  };

  return (
    <div id="login-page">
      <Header />
      {actionData?.errors.length === 0 && (
        <div className="successfull-login">✅ Welcome!</div>
      )}

      <Form method="post">
        <input type="text" name="login" placeholder={"Login"} />
        <input type="password" name="password" placeholder={"Password"} />
        <input type="submit" value="Log In" />
        <input
          type="button"
          value="Registration"
          onClick={handleRegisterRedirect}
        />
        {actionData?.errors.length > 0 && (
          <div className="erroneous-login">
            {actionData?.errors.map((error) => <div key={error}>{error}</div>)}
          </div>
        )}
      </Form>
      <Footer />
    </div>
  );
}

export default Login;
