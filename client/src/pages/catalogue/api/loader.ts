import { Page } from "domain/model/page";
import { fetchFavoriteInstrumentIds } from "pages/catalogue";
import { fetchInstruments } from "pages/catalogue/api/fetch-instruments";

export interface CatalogueLoader {
  instrumentPage: Page;
  favoriteInstrumentIds: number[];
}

export const loader = async (): Promise<CatalogueLoader> => {
  const instruments = await fetchInstruments();
  const favoriteInstrumentIds = await fetchFavoriteInstrumentIds();

  return {
    instrumentPage: instruments,
    favoriteInstrumentIds: favoriteInstrumentIds,
  };
};
