import axios from "axios";
import { SERVER_URL } from "shared/config";
import { Profile } from "domain/model/profile";
import Jwt from "domain/model/jwt";
import { API_PROFILE } from "shared/config/backend";
import { redirect } from "react-router-dom";
import { LOGIN } from "shared/config/paths";

export const loader = async (): Promise<Profile> => {
  const jwt = Jwt.extractFromLocalStorage();

  if (jwt === null) {
    throw redirect(LOGIN);
  }

  if (jwt?.expired()) {
    throw redirect(LOGIN);
  }

  return axios
    .get<Profile>(`${SERVER_URL}${API_PROFILE}`, {
      headers: {
        Authorization: `Bearer ${jwt.toStringValue()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      throw redirect(LOGIN);
    });
};
