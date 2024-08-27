import { LoaderFunction, redirect } from "react-router-dom";
import { InstrumentDetail } from "generated/model";
import { ListFavoriteApi } from "generated/api/list-favorite-api";
import Jwt from "domain/model/jwt";
import { LOGIN } from "shared/config/paths";
import { apiConfig } from "shared/config/api";

export interface FavoriteLoader {
  instrumentDetails: InstrumentDetail[];
}

const listFavorite = new ListFavoriteApi(apiConfig);

export const loader: LoaderFunction = async (): Promise<
  FavoriteLoader | Response
> => {
  const jwt = Jwt.extractFromCookie();
  if (jwt === null || jwt.expired()) {
    Jwt.eraseFromCookie(); // need to rerender header
    return redirect(LOGIN);
  }

  const response = await listFavorite.listFavorite({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${Jwt.extractFromCookie()?.toStringValue()}`,
    },
  });

  return {
    instrumentDetails: response.data.content,
  };
};
