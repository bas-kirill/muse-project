import { fetchFavoriteInstrumentIdsList } from "shared/api/fetch-favorite-instrument-ids.list";
import {
  CATALOGUE_DEFAULT_PAGE_NUMBER,
  CATALOGUE_DEFAULT_PAGE_SIZE,
} from "shared/config";
import { GetInstrumentsByCriteriaPaginatedApi } from "generated/api";
import { GetInstrumentByCriteriaPageResponse } from "generated/model";

const getInstrumentsByCriteriaPaginated =
  new GetInstrumentsByCriteriaPaginatedApi();

export interface CatalogueLoader {
  instrumentPage: GetInstrumentByCriteriaPageResponse;
  favoriteInstrumentIds: number[];
}

export const loader = async (): Promise<CatalogueLoader> => {
  const instrumentsPagePromise =
    await getInstrumentsByCriteriaPaginated.getInstrumentsByCriteriaPaginated(
      CATALOGUE_DEFAULT_PAGE_SIZE,
      CATALOGUE_DEFAULT_PAGE_NUMBER,
      {},
      {
        withCredentials: true,
      },
    );
  const favoriteInstrumentIds = await fetchFavoriteInstrumentIdsList();

  return {
    instrumentPage: instrumentsPagePromise.data,
    favoriteInstrumentIds: favoriteInstrumentIds,
  };
};
