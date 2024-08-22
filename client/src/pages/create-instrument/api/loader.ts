import { LoaderFunction } from "react-router-dom";
import { SERVER_URL } from "shared/config";
import { API_COUNTRIES, API_MANUFACTURERS } from "shared/config/backend";
import axios from "axios";
import { Countries } from "domain/model/country";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import type { InstrumentBasicMaterial, InstrumentType } from "generated/model";
import { GetInstrumentBasicMaterialsApi } from "generated/api/get-instrument-basic-materials-api";

const getInstrumentTypes = new GetInstrumentTypesApi();
const getInstrumentBasicMaterials = new GetInstrumentBasicMaterialsApi();

export interface CreateInstrumentLoader {
  instrumentTypes: InstrumentType[];
  manufacturerNames: ManufacturerNames;
  materials: InstrumentBasicMaterial[];
  countries: Countries;
}

export const loader: LoaderFunction =
  async (): Promise<CreateInstrumentLoader> => {
    const instrumentTypesRequest =
      await getInstrumentTypes.getInstrumentTypes();

    const instrumentBasicMaterialsRequest =
      await getInstrumentBasicMaterials.getInstrumentBasicMaterials();

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
      instrumentTypes: instrumentTypesRequest.data.content,
      manufacturerNames: manufacturers,
      materials: instrumentBasicMaterialsRequest.data.content,
      countries: countries,
    };
  };
