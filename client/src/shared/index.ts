import { deleteInstrument } from "./api/delete-instrument";

import { getInstrumentsByCriteria } from "./api/list-instruments-by-criteria";

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
  SERVER_URL,
  API_INSTRUMENTS,
  API_AUTH_BASIC_LOGIN,
  CATALOGUE_DEFAULT_PAGE_SIZE,
  CATALOGUE_DEFAULT_PAGE_NUMBER,
};
