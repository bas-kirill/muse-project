import { ActionFunction } from "react-router-dom";
import Jwt from "domain/model/jwt";
import { parseInstrumentDetails } from "shared/model/parseInstrumentDetails";
import { CreateInstrumentApi } from "generated/api/create-instrument-api";

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
    errors,
  } = parseInstrumentDetails(await request.formData());

  if (errors.length > 0) {
    return {
      errors: errors,
    };
  }

  const response = await createInstrument.createInstrument(
    {
      instrument_name: instrumentName,
      instrument_type: instrumentType.instrument_type,
      manufacturer_name: manufacturerName,
      manufacturer_date: manufactureDate,
      release_date: releaseDate,
      country: country.country,
      materials: materials.map((material) => material.basic_material),
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
    errors: [...errors, `Failed to create instrument '${instrumentName}'`],
  };
};
