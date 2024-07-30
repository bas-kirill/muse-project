import { LoaderFunction } from "react-router-dom";
import { SERVER_URL } from "shared/config";
import {
  API_COUNTRIES,
  API_INSTRUMENT_MATERIALS,
  API_INSTRUMENT_TYPES,
  API_MANUFACTURERS,
} from "shared/config/backend";
import axios from "axios";
import { InstrumentTypes } from "domain/model/instrument-type";
import Jwt from "domain/model/jwt";
import { Materials } from "domain/model/material";
import { Countries } from "domain/model/country";
import { ManufacturerNames } from "domain/model/manufacturer-name";

export interface CreateInstrumentLoader {
  instrumentTypes: InstrumentTypes;
  manufacturerNames: ManufacturerNames;
  materials: Materials;
  countries: Countries;
}

export const loader: LoaderFunction =
  async (): Promise<CreateInstrumentLoader> => {
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
      instrumentTypes: instrumentTypes,
      manufacturerNames: manufacturers,
      materials: materials,
      countries: countries,
    };
  };
