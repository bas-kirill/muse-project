import { LoaderFunction } from "react-router-dom";
import { SERVER_URL } from "shared/config";
import {
  API_COUNTRIES,
  API_INSTRUMENT_MATERIALS,
  API_MANUFACTURERS
} from "shared/config/backend";
import axios from "axios";
import { Materials } from "domain/model/material";
import { Countries } from "domain/model/country";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import { InstrumentType } from "generated/model/instrument-type";

const getInstrumentTypes = new GetInstrumentTypesApi();

export interface CreateInstrumentLoader {
  instrumentTypes: InstrumentType[];
  manufacturerNames: ManufacturerNames;
  materials: Materials;
  countries: Countries;
}

export const loader: LoaderFunction =
  async (): Promise<CreateInstrumentLoader> => {
    const instrumentTypesRequest = await getInstrumentTypes.getInstrumentTypes();
    let instrumentTypes = instrumentTypesRequest.data.content;

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
      countries: countries
    };
  };
