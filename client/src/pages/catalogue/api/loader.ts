import {
  CATALOGUE_DEFAULT_PAGE_NUMBER,
  CATALOGUE_DEFAULT_PAGE_SIZE,
} from "shared/config";
import {
  GetInstrumentsByCriteriaPaginatedApi,
  ListFavoriteApi,
} from "generated/api";
import {
  GetInstrumentByCriteriaPageResponse,
  InstrumentId,
} from "generated/model";

const getInstrumentsByCriteriaPaginated =
  new GetInstrumentsByCriteriaPaginatedApi();

const listFavoriteApi = new ListFavoriteApi();

export interface CatalogueLoader {
  instrumentPage: GetInstrumentByCriteriaPageResponse;
  favoriteInstrumentIds: InstrumentId[];
}

export const loader = async (): Promise<CatalogueLoader> => {
  const instrumentsPage =
    await getInstrumentsByCriteriaPaginated.getInstrumentsByCriteriaPaginated(
      CATALOGUE_DEFAULT_PAGE_SIZE,
      CATALOGUE_DEFAULT_PAGE_NUMBER,
      {},
      {
        withCredentials: true,
      },
    );

  const favoriteInstrumentDetails = await listFavoriteApi.listFavorite();
  const favoriteInstrumentIds = favoriteInstrumentDetails.data.content.map(
    (favorite) => favorite.instrument_id,
  );
  return {
    instrumentPage: instrumentsPage.data,
    favoriteInstrumentIds: favoriteInstrumentIds,
  };
};
