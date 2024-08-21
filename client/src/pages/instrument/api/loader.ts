import axios from "axios";
import { SERVER_URL } from "shared/config";
import { API_INSTRUMENT_BY_ID } from "shared/config/backend";
import { LoaderFunction } from "react-router-dom";
import { InstrumentDetail } from "generated/model";

export const loader: LoaderFunction = async ({
  params,
}): Promise<InstrumentDetail> => {
  const url = `${SERVER_URL}${API_INSTRUMENT_BY_ID}` + params.instrumentId;
  const { data, status } = await axios.get<InstrumentDetail>(url);

  if (status !== 200) {
    throw new Error(
      `Failed to extract instrument ID: '${params.instrumentId}'`,
    );
  }

  return data;
};
