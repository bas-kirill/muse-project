import { ActionFunction } from "react-router-dom";
import { parseForm } from "pages/registration/model/parseForm";
import { UserRegistrationApi } from "generated/api/user-registration-api";
import { apiConfig } from "shared/config/api";

const userRegistrationApi = new UserRegistrationApi(apiConfig);

export interface RegistrationAction {
  errors: string[];
}

export const action: ActionFunction = async ({
  request,
}): Promise<RegistrationAction> => {
  const { fullName, login, password, errors } = parseForm(
    await request.formData(),
  );

  if (errors.length !== 0) {
    return {
      errors: errors,
    };
  }

  const response = await userRegistrationApi.userRegistration({
    full_name: fullName,
    login: login,
    password: password,
  });

  if (response.status === 200) {
    return {
      errors: [],
    };
  }

  return {
    errors: [`User already exists`],
  };
};
