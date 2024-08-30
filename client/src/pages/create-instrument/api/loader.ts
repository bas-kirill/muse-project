import { LoaderFunction } from "react-router-dom";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import type {
  Country,
  BasicMaterial,
  InstrumentType,
  ManufactureType,
} from "generated/model";
import { GetInstrumentBasicMaterialsApi } from "generated/api/get-instrument-basic-materials-api";
import { GetCountriesApi } from "generated/api";
import { GetManufacturersApi } from "generated/api";
import { apiConfig } from "shared/config/api";

const getInstrumentTypes = new GetInstrumentTypesApi(apiConfig);
const getInstrumentBasicMaterials = new GetInstrumentBasicMaterialsApi(
  apiConfig,
);
const getCountries = new GetCountriesApi(apiConfig);
const getManufacturers = new GetManufacturersApi(apiConfig);

export interface CreateInstrumentLoader {
  instrumentTypes: InstrumentType[];
  manufacturerTypes: ManufactureType[];
  materials: BasicMaterial[];
  countries: Country[];
}

export const loader: LoaderFunction =
  async (): Promise<CreateInstrumentLoader> => {
    const instrumentTypesRequest =
      await getInstrumentTypes.getInstrumentTypes();

    const instrumentBasicMaterialsRequest =
      await getInstrumentBasicMaterials.getInstrumentBasicMaterials();

    const countriesRequest = await getCountries.getCountries();

    const manufacturersRequest = await getManufacturers.getManufacturers();

    return {
      instrumentTypes: instrumentTypesRequest.data.content,
      manufacturerTypes: manufacturersRequest.data.content,
      materials: instrumentBasicMaterialsRequest.data.content,
      countries: countriesRequest.data.content,
    };
  };
