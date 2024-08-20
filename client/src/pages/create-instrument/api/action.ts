import { ActionFunction } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "shared/config";
import { API_CREATE_INSTRUMENT } from "shared/config/backend";
import Jwt from "domain/model/jwt";
import { parseInstrumentDetails } from "shared/model/parseInstrumentDetails";

export interface CreateInstrumentAction {
  errors: string[] | null;
}

export const action: ActionFunction = async ({
  request,
}): Promise<CreateInstrumentAction> => {
  const {
    instrumentName,
    instrumentType,
    manufacturerName,
    manufactureDate,
    releaseDate,
    country,
    materials,
    errors,
  } = parseInstrumentDetails(await request.formData());

  if (errors.length > 0) {
    return {
      errors: errors,
    };
  }

  const { status } = await axios.post(
    `${SERVER_URL}${API_CREATE_INSTRUMENT}`,
    {
      instrumentName: instrumentName,
      instrumentType: instrumentType,
      manufacturerName: manufacturerName,
      manufactureDate: manufactureDate,
      releaseDate: releaseDate,
      country: country,
      material: materials,
    },
    {
      headers: {
        Authorization: `Bearer ${Jwt.extractFromLocalStorage()?.toStringValue()}`,
      },
    }, // https://stackoverflow.com/questions/39153080/how-can-i-get-the-status-code-from-an-http-error-in-axios
  );

  if (status === 200) {
    return {
      errors: null,
    };
  }

  return {
    errors: [...errors, `Failed to create instrument '${instrumentName}'`],
  };
};
