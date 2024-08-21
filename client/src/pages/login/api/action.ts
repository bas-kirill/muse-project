import { ActionFunction } from "react-router-dom";
import { parseForm } from "../model/parseForm";
import axios from "axios";
import { API_AUTH_BASIC_LOGIN, SERVER_URL } from "shared/config/backend";

export interface LogInAction {
  errors: string[];
}

export const action: ActionFunction = async ({
  request,
}): Promise<LogInAction> => {
  const { login, password, errors } = parseForm(await request.formData());

  if (errors.length !== 0) {
    return {
      errors: errors,
    };
  }

  const { status } = await axios.post(
    `${SERVER_URL}${API_AUTH_BASIC_LOGIN}`,
    {
      username: login,
      password: password,
    },
    {
      withCredentials: true,
      validateStatus: () => true,
    },
  );

  if (status !== 200) {
    return {
      errors: ["Failed to authenticate"],
    };
  }

  return {
    errors: [],
  };
};
