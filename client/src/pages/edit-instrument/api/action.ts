import { InstrumentName } from "domain/model/instrument-name";
import { InstrumentType } from "domain/model/instrument-type";
import { ManufacturerName } from "domain/model/manufacturer-name";
import { ManufactureDate } from "domain/model/manufacture-date";
import { ReleaseDate } from "domain/model/release-date";
import { Country } from "domain/model/country";
import { Material } from "domain/model/material";
import { ActionFunction } from "react-router-dom";
import { parseInstrumentDetails } from "pages/create-instrument/model/parseInstrumentDetails";
import axios from "axios";
import { SERVER_URL } from "shared/config";
import Jwt from "domain/model/jwt";

export interface EditInstrumentAction {
  errors: string[] | null;
}

interface EditInstrumentRequestBody {
  instrumentId: number;
  instrumentName: InstrumentName;
  instrumentType: InstrumentType;
  manufacturerName: ManufacturerName;
  manufactureDate: ManufactureDate;
  releaseDate: ReleaseDate;
  country: Country;
  material: Material;
}

export const action: ActionFunction = async ({
  request,
}): Promise<EditInstrumentAction> => {
  const {
    instrumentId,
    instrumentName,
    instrumentType,
    manufacturerName,
    manufactureDate,
    releaseDate,
    country,
    material,
    errors,
  } = parseInstrumentDetails(await request.formData());

  if (errors.length > 0) {
    return {
      errors: errors,
    };
  }

  const editInstrumentRequestBody: EditInstrumentRequestBody = {
    instrumentId: instrumentId.toNumberValue(),
    instrumentName: instrumentName,
    instrumentType: instrumentType,
    manufacturerName: manufacturerName,
    manufactureDate: manufactureDate,
    releaseDate: releaseDate,
    country: country,
    material: material,
  };

  const { status } = await axios.post(
    `${SERVER_URL}/api/instrument/edit`,
    editInstrumentRequestBody,
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
    errors: [...errors, `Failed to edit instrument: '${instrumentName}'`],
  };
};
