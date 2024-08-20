import { ActionFunction } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "shared/config";
import { InstrumentName } from "domain/model/instrument-name";
import { InstrumentType } from "domain/model/instrument-type";
import { ManufacturerName } from "domain/model/manufacturer-name";
import { ManufactureDate } from "domain/model/manufacture-date";
import { ReleaseDate } from "domain/model/release-date";
import { Country } from "domain/model/country";
import { Materials } from "domain/model/material";
import { API_CREATE_INSTRUMENT } from "shared/config/backend";
import Jwt from "domain/model/jwt";
import { parseInstrumentDetails } from "shared/model/parseInstrumentDetails";

export interface CreateInstrumentAction {
  errors: string[] | null;
}

interface CreateInstrumentRequestBody {
  instrumentName: InstrumentName;
  instrumentType: InstrumentType;
  manufacturerName: ManufacturerName;
  manufactureDate: ManufactureDate;
  releaseDate: ReleaseDate;
  country: Country;
  materials: Materials;
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

  const createInstrumentRequestBody = {
    instrumentName: instrumentName,
    instrumentType: instrumentType,
    manufacturerName: manufacturerName,
    manufactureDate: manufactureDate,
    releaseDate: releaseDate,
    country: country,
    material: materials,
  };

  const { status } = await axios.post(
    `${SERVER_URL}${API_CREATE_INSTRUMENT}`,
    createInstrumentRequestBody,
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
