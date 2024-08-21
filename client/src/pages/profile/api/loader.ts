import { Profile } from "domain/model/profile";
import Jwt from "domain/model/jwt";
import { redirect } from "react-router-dom";
import { LOGIN } from "shared/config/paths";
import { ProfileApi } from "generated/api/profile-api";

const profileApi = new ProfileApi();

export const loader = async (): Promise<Profile> => {
  return profileApi
    .getProfile({
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
