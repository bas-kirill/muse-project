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
import { Filters } from "widgets/catalogue-filter";

const getInstrumentsByCriteriaPaginated =
  new GetInstrumentsByCriteriaPaginatedApi();
const listFavoriteApi = new ListFavoriteApi();

export interface CatalogueLoader {
  instrumentPage: GetInstrumentByCriteriaPageResponse;
  favoriteInstrumentIds: InstrumentId[];
  defaultFilter: Filters;
}

export const loader = async (): Promise<CatalogueLoader> => {
  const instrumentsPage =
    await getInstrumentsByCriteriaPaginated.getInstrumentsByCriteriaPaginated(
      CATALOGUE_DEFAULT_PAGE_SIZE,
      CATALOGUE_DEFAULT_PAGE_NUMBER,
      {
        instrument_name: null,
        instrument_types: null,
        manufacturer_names: null,
        manufacture_date_from: null,
        manufacture_date_to: null,
        release_date_from: null,
        release_date_to: null,
        countries: null,
        materials: null,
        instrument_ids: null,
      },
    );

  const favoriteInstrumentsRequest = await listFavoriteApi.listFavorite({
    withCredentials: true,
  });
  const favoriteInstrumentIds = favoriteInstrumentsRequest.data.content.map(
    (favorite) => favorite.instrument_id,
  );
  return {
    instrumentPage: instrumentsPage.data,
    favoriteInstrumentIds: favoriteInstrumentIds,
    defaultFilter: {
      instrumentName: null,
      instrumentTypes: null,
      manufacturerNames: null,
      manufactureDateFrom: null,
      manufactureDateTo: null,
      releaseDateFrom: null,
      releaseDateTo: null,
      countries: null,
      materials: null,
      instrumentIds: null,
    },
  };
};
