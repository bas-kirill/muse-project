import axios from "axios";
import { Page } from "domain/model/page";
import {
  API_INSTRUMENTS,
  CATALOGUE_DEFAULT_PAGE_NUMBER,
  CATALOGUE_DEFAULT_PAGE_SIZE,
  SERVER_URL,
} from "shared/config";

export const fetchInstruments = async () => {
  const { data, status } = await axios.post<Page>(
    `${SERVER_URL}${API_INSTRUMENTS}`,
    {},
    {
      params: {
        pageNumber: CATALOGUE_DEFAULT_PAGE_NUMBER,
        pageSize: CATALOGUE_DEFAULT_PAGE_SIZE,
      },
    },
  );
  if (status !== 200) {
    throw new Error(`Failed to extract instruments`);
  }

  return data;
};
