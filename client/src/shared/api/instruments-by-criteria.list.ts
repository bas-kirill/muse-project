import axios from "axios";
import { API_INSTRUMENTS, SERVER_URL } from "shared/config";
import { Filters } from "widgets/catalogue-filter";
import { InstrumentDetail } from "generated/model";

export const getInstrumentsByCriteria = async (filters: Filters) => {
  const { data, status } = await axios.post<InstrumentDetail[]>(
    `${SERVER_URL}${API_INSTRUMENTS}`,
    JSON.stringify(filters, null, 2),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (status !== 200) {
    throw new Error("Failed to fetch instruments");
  }

  return data;
};
