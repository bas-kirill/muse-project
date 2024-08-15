import { deleteInstrument } from "./api/delete-instrument";
import { getInstrumentsByCriteria } from "./api/instruments-by-criteria.list";
import { fetchFavoriteInstrumentIdsList } from "./api/fetch-favorite-instrument-ids.list";
import { InstrumentCard } from "./ui/instrument-card/InstrumentCard";

import {
  SERVER_URL,
  API_INSTRUMENTS,
  API_AUTH_BASIC_LOGIN,
} from "./config/backend";

import {
  CATALOGUE_DEFAULT_PAGE_SIZE,
  CATALOGUE_DEFAULT_PAGE_NUMBER,
} from "./config/frontend";

export {
  deleteInstrument,
  getInstrumentsByCriteria,
  fetchFavoriteInstrumentIdsList,
  InstrumentCard,
  SERVER_URL,
  API_INSTRUMENTS,
  API_AUTH_BASIC_LOGIN,
  CATALOGUE_DEFAULT_PAGE_SIZE,
  CATALOGUE_DEFAULT_PAGE_NUMBER,
};
