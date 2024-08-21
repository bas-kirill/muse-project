import { ActionFunction } from "react-router-dom";
import { parseForm } from "../model/parseForm";
import { BasicLoginApi } from "generated/api/basic-login-api";

export interface LogInAction {
  errors: string[];
}

const basicLoginApi = new BasicLoginApi();

export const action: ActionFunction = async ({
  request,
}): Promise<LogInAction> => {
  const { login, password, errors } = parseForm(await request.formData());

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

  if (response.status !== 200) {
    return {
      errors: ["Failed to authenticate"],
    };
  }

  return {
    errors: [],
  };
};
