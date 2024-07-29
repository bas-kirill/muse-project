import axios from "axios";
import { API_INSTRUMENT_BY_ID, SERVER_URL } from "shared/config/backend";
import Jwt from "domain/model/jwt";
import { InstrumentId } from "@domain/model/instrument-id";

interface DeleteInstrumentByIdResponse {
  status: number;
}

export const deleteInstrument = async (
  id: InstrumentId,
): Promise<DeleteInstrumentByIdResponse> => {
  const url = `${SERVER_URL}${API_INSTRUMENT_BY_ID}${id.toStringValue()}/delete`;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${Jwt.extractFromLocalStorage()?.toStringValue()}`,
  };

  const { status } = await axios.post(
    url,
    {},
    {
      headers: headers,
    },
  );

  return {
    status: status,
  };
};
