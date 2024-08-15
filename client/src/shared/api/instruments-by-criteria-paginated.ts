import { Filters } from "@widgets/catalogue-filter";
import { Page, PageRequest } from "@domain/model/page";
import axios from "axios";
import { API_INSTRUMENTS, SERVER_URL } from "shared/config";

export const getInstrumentsByCriteriaPaginated = async (
  filters: Filters,
  pageRequest: PageRequest,
) => {
  const getInstrumentsByCriteriaRequestBody = JSON.stringify(filters, null, 2);

  const { data, status } = await axios.post<Page>(
    `${SERVER_URL}${API_INSTRUMENTS}`,
    getInstrumentsByCriteriaRequestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        pageNumber: pageRequest.pageNumber,
        pageSize: pageRequest.pageSize,
      },
    },
  );

  if (status !== 200) {
    console.log(data);
    console.log(status);
    throw new Error("Failed to fetch instruments");
  }

  return data;
};
