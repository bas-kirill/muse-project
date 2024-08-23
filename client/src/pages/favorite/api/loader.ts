import { LoaderFunction } from "react-router-dom";
import { InstrumentDetail } from "generated/model";
import { ListFavoriteApi } from "generated/api/list-favorite-api";

export interface FavoriteLoader {
  instrumentDetails: InstrumentDetail[];
}

const listFavorite = new ListFavoriteApi();

export const loader: LoaderFunction = async (): Promise<FavoriteLoader> => {
  const response = await listFavorite.listFavorite({
    withCredentials: true,
  });

  return {
    instrumentDetails: response.data.content,
  };
};
