import Jwt from "domain/model/jwt";
import { redirect } from "react-router-dom";
import { LOGIN } from "shared/config/paths";
import { GetUserProfileApi } from "generated/api/get-user-profile-api";
import { ProfileDetails } from "generated/model";

const getUserProfile = new GetUserProfileApi();

export const loader = async (): Promise<ProfileDetails> => {
  const response = await getUserProfile
    .getProfile({
      headers: {
        Authorization: `Bearer ${Jwt.extractFromCookie()?.toStringValue()}`
      }
    });
  return response.data;
};
