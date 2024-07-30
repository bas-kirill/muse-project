import { InstrumentTypes } from "domain/model/instrument-type";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import { Materials } from "domain/model/material";
import { Countries } from "domain/model/country";
import { LoaderFunction } from "react-router-dom";
import Jwt from "domain/model/jwt";
import axios from "axios";
import { SERVER_URL } from "shared/config";
import {
  API_COUNTRIES,
  API_INSTRUMENT_MATERIALS,
  API_INSTRUMENT_TYPES,
  API_MANUFACTURERS,
} from "shared/config/backend";
import { Instrument } from "domain/model/instrument";

export interface EditInstrumentLoader {
  instrumentForEdit: Instrument;
  instrumentTypes: InstrumentTypes;
  manufacturerNames: ManufacturerNames;
  materials: Materials;
  countries: Countries;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<EditInstrumentLoader> => {
  const url = `${SERVER_URL}/api/instrument/` + params.instrumentId;

  let instrument: Instrument | undefined = undefined;
  await axios
    .get<Instrument>(url)
    .then((data) => {
      instrument = data.data;
    })
    .catch((e) => {
      throw new Error(`Fail to retrieve instrument: '${e}'`);
    });

  let instrumentTypes: string[] = [];
  console.log(`jwt: ${Jwt.extractFromLocalStorage()?.value}`);
  await axios
    .get<InstrumentTypes>(`${SERVER_URL}${API_INSTRUMENT_TYPES}`)
    .then((data) => {
      instrumentTypes = data.data;
    })
    .catch((e) => {
      throw new Error(`Fail to retrieve instrument types: ${e}`);
    });

  let materials: Materials = [];
  await axios
    .get<Materials>(`${SERVER_URL}${API_INSTRUMENT_MATERIALS}`)
    .then((data) => {
      materials = data.data;
    })
    .catch((e) => {
      throw new Error(`Fail to retrieve instrument materials: ${e}`);
    });

  let countries: string[] = [];
  await axios
    .get<Countries>(`${SERVER_URL}${API_COUNTRIES}`)
    .then((data) => {
      countries = data.data;
    })
    .catch(() => {
      throw new Error("Fail to retrieve countries");
    });

  let manufacturers: ManufacturerNames = [];
  await axios
    .get<ManufacturerNames>(`${SERVER_URL}${API_MANUFACTURERS}`)
    .then((data) => {
      manufacturers = data.data;
    })
    .catch(() => {
      throw new Error("Fail to retrieve manufacturer names");
    });

  return {
    // @ts-expect-error
    instrumentForEdit: instrument,
    instrumentTypes: instrumentTypes,
    manufacturerNames: manufacturers,
    materials: materials,
    countries: countries,
  };
};
