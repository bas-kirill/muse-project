import { ActionFunction } from "react-router-dom";
import { parseForm } from "pages/registration/model/parseForm";
import axios from "axios";
import { SERVER_URL } from "shared/config";
import { API_REGISTRATION } from "shared/config/backend";

interface RegistrationRequestBody {
  name: string;
  surname: string;
  login: string;
  password: string;
}

export interface RegistrationAction {
  errors: string[];
}

export const action: ActionFunction = async ({
  request,
}): Promise<RegistrationAction> => {
  const { name, surname, login, password, errors } = parseForm(
    await request.formData(),
  );

  if (errors.length !== 0) {
    return {
      errors: errors,
    };
  }

  const registrationRequestBody: RegistrationRequestBody = {
    name: name,
    surname: surname,
    login: login,
    password: password,
  };

  const { status } = await axios.post(
    `${SERVER_URL}${API_REGISTRATION}`,
    registrationRequestBody,
    { validateStatus: () => true }, // https://stackoverflow.com/questions/39153080/how-can-i-get-the-status-code-from-an-http-error-in-axios
  );

  if (status === 200) {
    return {
      errors: [],
    };
  }

  return {
    errors: [`Failed to authenticate: '${status}' code`],
  };
};
