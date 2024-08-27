import { ActionFunction, redirect } from "react-router-dom";
import { parseLoginForm } from "./../model/parse-login-form";
import { BasicLoginApi } from "generated/api";
import { PROFILE } from "shared/config/paths";
import { apiConfig } from "shared/config/api";

export interface LoginAction {
  errors: string[];
}

const basicLoginApi = new BasicLoginApi(apiConfig);

export const action: ActionFunction = async ({
  request,
}): Promise<LoginAction | Response> => {
  const { login, password, errors } = parseLoginForm(await request.formData());

  if (errors.length !== 0) {
    return {
      errors: errors,
    };
  }

  const response = await basicLoginApi.basicLogin(
    {
      username: login,
      password: password,
    },
    {
      withCredentials: true,
      validateStatus: () => true,
    },
  );

  if (response.status === 200) {
    return redirect(PROFILE);
  }

  if (response.status !== 200) {
    return {
      errors: ["Failed to authenticate"],
    };
  }

  return {
    errors: [],
  };
};
