import { LoaderFunction } from "react-router-dom";
import { fetchFavoriteInstrumentIdsList } from "shared/api/fetch-favorite-instrument-ids.list";
import { Filters } from "widgets/catalogue-filter";
import { Instrument } from "domain/model/instrument";
import { getInstrumentsByCriteria } from "shared/api/instruments-by-criteria.list";

export interface FavoriteLoader {
  instruments: Instrument[];
}

export const loader: LoaderFunction = async (): Promise<FavoriteLoader> => {
  const favoriteInstrumentIds = await fetchFavoriteInstrumentIdsList()
  const filter = {
    instrumentId: favoriteInstrumentIds,
  } as unknown as Filters;
  const instruments = await getInstrumentsByCriteria(filter)

  return {
    instruments: instruments,
  }
};