import { ActionFunction } from "react-router-dom";
import Jwt from "domain/model/jwt";
import { CreateInstrumentApi } from "generated/api/create-instrument-api";
import { parseInstrumentDetails } from "shared";

export interface CreateInstrumentAction {
  errors: string[] | null;
}

const createInstrument = new CreateInstrumentApi();

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
    instrumentPhoto,
    errors,
  } = parseInstrumentDetails(await request.formData());

  if (errors.length > 0) {
    return {
      errors: errors,
    };
  }

  const response = await createInstrument.createInstrument(
    {
      instrument_detail: {
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
        Authorization: `Bearer ${Jwt.extractFromLocalStorage()?.toStringValue()}`,
      },
    },
  );

  if (response.status === 200) {
    return {
      errors: null,
    };
  }

  return {
    errors: [
      ...errors,
      `Failed to create instrument '${instrumentName.instrument_name}'`,
    ],
  };
};
