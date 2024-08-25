import { ActionFunction } from "react-router-dom";
import Jwt from "domain/model/jwt";
import { EditInstrumentApi } from "generated/api/edit-instrument-api";
import { parseInstrumentDetails } from "shared/model";

export interface EditInstrumentAction {
  errors: string[];
}

const editInstrument = new EditInstrumentApi();

export const action: ActionFunction = async ({
  request,
}): Promise<EditInstrumentAction> => {
  return {
    errors: [],
  };

  const {
    instrumentId,
    instrumentName,
    instrumentType,
    manufacturerName,
    manufactureDate,
    releaseDate,
    country,
    materials,
    instrumentPhoto,
    errors,
  } = parseInstrumentDetails(await request.formData());

  if (errors.length > 0) {
    return {
      errors: errors,
    };
  }

  const response = await editInstrument.editInstrument(
    {
      instrument_detail: {
        instrument_id: instrumentId,
        instrument_name: instrumentName,
        instrument_type: instrumentType,
        manufacturer_name: manufacturerName,
        manufacturer_date: manufactureDate,
        release_date: releaseDate,
        country: country,
        basic_materials: materials,
      },
      instrument_photo: {
        photo: instrumentPhoto.photo,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${Jwt.extractFromCookie()?.toStringValue()}`,
      },
    },
  );

  if (response.status === 200) {
    return {
      errors: [],
    };
  }

  return {
    errors: [
      ...errors,
      `Failed to edit instrument: '${instrumentName.instrument_name}'`,
    ],
  };
};
