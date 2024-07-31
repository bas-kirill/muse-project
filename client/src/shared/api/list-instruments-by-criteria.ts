import axios from "axios";
import { Page } from "domain/model/page";
import { API_INSTRUMENTS, SERVER_URL } from "shared/config";
import { Filters } from "widgets/catalogue-filter";

export const getInstrumentsByCriteria = async (
  filters: Filters,
  page: Page,
) => {
  const getInstrumentsByCriteriaRequestBody = JSON.stringify(filters, null, 2);
  const { data } = await axios.post<Page>(
    `${SERVER_URL}${API_INSTRUMENTS}`,
    getInstrumentsByCriteriaRequestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      },
    },
  );

  return data;
};
