import axios from "axios";
import { SERVER_URL } from "shared/config";
import { API_INSTRUMENT_BY_ID } from "shared/config/backend";
import { LoaderFunction } from "react-router-dom";
import { InstrumentName } from "domain/model/instrument-name";
import { InstrumentType } from "domain/model/instrument-type";
import { ManufacturerName } from "domain/model/manufacturer-name";
import { ManufactureDate } from "domain/model/manufacture-date";
import { ReleaseDate } from "domain/model/release-date";
import { Country } from "domain/model/country";
import { Materials } from "domain/model/material";
import { InstrumentId } from "domain/model/instrument-id";

export interface InstrumentDetails {
  id: InstrumentId;
  name: InstrumentName;
  type: InstrumentType;
  manufacturer: ManufacturerName;
  manufacturerDate: ManufactureDate;
  releaseDate: ReleaseDate;
  country: Country;
  basicMaterials: Materials;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<InstrumentDetails> => {
  const url = `${SERVER_URL}${API_INSTRUMENT_BY_ID}` + params.instrumentId;
  const { data, status } = await axios.get<InstrumentDetails>(url);

  if (status !== 200) {
    throw new Error(
      `Failed to extract instrument ID: '${params.instrumentId}'`,
    );
  }

  return data;
};
