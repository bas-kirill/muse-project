import Jwt from "domain/model/jwt";
import { GetUserProfileApi } from "generated/api/get-user-profile-api";
import { ProfileDetails } from "generated/model";
import { LOGIN } from "shared/config/paths";
import { redirect } from "react-router-dom";

const getUserProfile = new GetUserProfileApi();

export const loader = async (): Promise<ProfileDetails | Response> => {
  const jwt = Jwt.extractFromCookie();
  if (jwt === null || jwt.expired()) {
    Jwt.eraseFromCookie(); // need to rerender header
    return redirect(LOGIN);
  }

  const response = await getUserProfile.getProfile({
    headers: {
      Authorization: `Bearer ${Jwt.extractFromCookie()?.toStringValue()}`,
    },
  });

  return response.data;
};
