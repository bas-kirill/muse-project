import { GetInstrumentsByCriteriaPaginatedApi } from "generated/api";
import { GetInstrumentByCriteriaPageResponse } from "generated/model";
import { Filters } from "widgets/catalogue-filter";
import {
  CATALOGUE_DEFAULT_PAGE_NUMBER,
  CATALOGUE_DEFAULT_PAGE_SIZE,
} from "shared/config/frontend";

const getInstrumentsByCriteriaPaginated =
  new GetInstrumentsByCriteriaPaginatedApi();

export interface CatalogueLoader {
  instrumentPage: GetInstrumentByCriteriaPageResponse;
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

  return {
    instrumentPage: instrumentsPage.data,
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
