import { LoaderFunction } from "react-router-dom";
import { SERVER_URL } from "shared/config";
import {
  API_COUNTRIES,
  API_INSTRUMENT_MATERIALS,
  API_INSTRUMENT_TYPES,
} from "shared/config/backend";
import axios from "axios";
import { InstrumentTypes } from "domain/model/instrument-type";
import Jwt from "domain/model/jwt";
import { Materials } from "domain/model/material";
import { Countries } from "domain/model/country";

export interface CreateInstrumentLoader {
  instrumentTypes: InstrumentTypes;
  materials: Materials;
  countries: Countries;
}

export const loader: LoaderFunction =
  async (): Promise<CreateInstrumentLoader> => {
    let instrumentTypes: string[] = [];
    console.log(`jwt: ${Jwt.extractFromLocalStorage()?.value}`);
    await axios
      .get<InstrumentTypes>(`${SERVER_URL}${API_INSTRUMENT_TYPES}`, {
        headers: {
          Authorization: `Bearer ${Jwt.extractFromLocalStorage()?.toStringValue()}`,
        },
      })
      .then((data) => {
        instrumentTypes = data.data;
      })
      .catch((e) => {
        throw new Error(`Fail to retrieve instrument types: ${e}`);
      });

    let materials: Materials = [];
    await axios
      .get<Materials>(`${SERVER_URL}${API_INSTRUMENT_MATERIALS}`, {
        headers: {
          Authorization: `Bearer ${Jwt.extractFromLocalStorage()?.toStringValue()}`,
        },
      })
      .then((data) => {
        materials = data.data;
      })
      .catch((e) => {
        throw new Error(`Fail to retrieve instrument materials: ${e}`);
      });

    let countries: string[] = [];
    await axios
      .get<Countries>(`${SERVER_URL}${API_COUNTRIES}`, {
        headers: {
          Authorization: `Bearer ${Jwt.extractFromLocalStorage()?.toStringValue()}`,
        },
      })
      .then((data) => {
        countries = data.data;
      })
      .catch(() => {
        throw new Error("Fail to retrieve countries");
      });

    return {
      instrumentTypes: instrumentTypes,
      materials: materials,
      countries: countries,
    };
  };
