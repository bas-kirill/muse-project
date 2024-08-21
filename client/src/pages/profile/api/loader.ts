import axios from "axios";
import { SERVER_URL } from "shared/config";
import { Profile } from "domain/model/profile";
import Jwt from "domain/model/jwt";
import { API_PROFILE } from "shared/config/backend";
import { redirect } from "react-router-dom";
import { LOGIN } from "shared/config/paths";

export const loader = async (): Promise<Profile> => {
  return axios
    .get<Profile>(`${SERVER_URL}${API_PROFILE}`, {
      headers: {
        Authorization: `Bearer ${Jwt.extractFromCookie()?.toStringValue()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      // JWT was changed or expired
      throw redirect(LOGIN);
    });
};
