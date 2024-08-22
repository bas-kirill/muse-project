import { LoaderFunction } from "react-router-dom";
import { SERVER_URL } from "shared/config";
import { API_MANUFACTURERS } from "shared/config/backend";
import axios from "axios";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import type {
  Country,
  InstrumentBasicMaterial,
  InstrumentType,
} from "generated/model";
import { GetInstrumentBasicMaterialsApi } from "generated/api/get-instrument-basic-materials-api";
import { GetCountriesApi } from "generated/api/get-countries-api";

const getInstrumentTypes = new GetInstrumentTypesApi();
const getInstrumentBasicMaterials = new GetInstrumentBasicMaterialsApi();
const getCountries = new GetCountriesApi();

export interface CreateInstrumentLoader {
  instrumentTypes: InstrumentType[];
  manufacturerNames: ManufacturerNames;
  materials: InstrumentBasicMaterial[];
  countries: Country[];
}

export const loader: LoaderFunction =
  async (): Promise<CreateInstrumentLoader> => {
    const instrumentTypesRequest =
      await getInstrumentTypes.getInstrumentTypes();

    const instrumentBasicMaterialsRequest =
      await getInstrumentBasicMaterials.getInstrumentBasicMaterials();

    const countriesRequest = await getCountries.getCountries();

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
      countries: countriesRequest.data.content,
    };
  };
