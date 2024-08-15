import axios from "axios";
import { API_INSTRUMENTS, SERVER_URL } from "shared/config";
import { Filters } from "widgets/catalogue-filter";
import { Instrument, Instruments } from "domain/model/instrument";

export const getInstrumentsByCriteria = async (
  filters: Filters,
) => {
  const getInstrumentsByCriteriaRequestBody = JSON.stringify(filters, null, 2);

  const { data, status } = await axios.post<Instruments>(
    `${SERVER_URL}${API_INSTRUMENTS}`,
    getInstrumentsByCriteriaRequestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  if (status !== 200) {
    throw new Error("Failed to fetch instruments");
  }

  return data;
};
