import { Page } from "domain/model/page";
import { fetchInstruments } from "pages/catalogue/api/fetch-instruments";
import { fetchFavoriteInstrumentIdsList } from "shared/api/fetch-favorite-instrument-ids.list";

export interface CatalogueLoader {
  instrumentPage: Page;
  favoriteInstrumentIds: number[];
}

export const loader = async (): Promise<CatalogueLoader> => {
  const instruments = await fetchInstruments();
  const favoriteInstrumentIds = await fetchFavoriteInstrumentIdsList();

  return {
    instrumentPage: instruments,
    favoriteInstrumentIds: favoriteInstrumentIds,
  };
};
