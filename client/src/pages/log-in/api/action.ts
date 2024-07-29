import { ActionFunction } from "react-router-dom";
import { Jwt } from "../../../domain";
import { parseAsLoginAndPassword } from "../model/parseAsLoginAndPassword";
import axios from "axios";
import { API_AUTH_BASIC_LOGIN, SERVER_URL } from "shared/config";

interface BasicLoginRequestBody {
  username: string;
  password: string;
}

export interface LogInAction {
  jwt: Jwt | null;
  errors: string[] | null;
}

export const action: ActionFunction = async ({
  request,
}): Promise<LogInAction> => {
  const { login, password, errors } = parseAsLoginAndPassword(
    await request.formData(),
  );

  if (errors.length !== 0) {
    return {
      jwt: null,
      errors: errors,
    };
  }

  const basicLoginRequestBody: BasicLoginRequestBody = {
    username: login,
    password: password,
  };

  const { data, status } = await axios.post(
    `${SERVER_URL}${API_AUTH_BASIC_LOGIN}`,
    basicLoginRequestBody,
    { validateStatus: () => true }, // https://stackoverflow.com/questions/39153080/how-can-i-get-the-status-code-from-an-http-error-in-axios
  );

  if (status === 200) {
    const jwt = Jwt.from(data.jwtToken);
    Jwt.putToLocalStorage(jwt.toStringValue());
    return {
      jwt: jwt,
      errors: null,
    };
  }

  return {
    jwt: null,
    errors: [`Failed to authenticate: '${status}' code`],
  };
};
