import { LoaderFunction } from "react-router-dom";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import type {
  Country,
  InstrumentBasicMaterial,
  InstrumentType, Manufacturer
} from "generated/model";
import { GetInstrumentBasicMaterialsApi } from "generated/api/get-instrument-basic-materials-api";
import { GetCountriesApi } from "generated/api/get-countries-api";
import { GetManufacturersApi } from "generated/api/get-manufacturers-api";

const getInstrumentTypes = new GetInstrumentTypesApi();
const getInstrumentBasicMaterials = new GetInstrumentBasicMaterialsApi();
const getCountries = new GetCountriesApi();
const getManufacturers = new GetManufacturersApi();

export interface CreateInstrumentLoader {
  instrumentTypes: InstrumentType[];
  manufacturers: Manufacturer[];
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

    const manufacturersRequest = await getManufacturers.getManufacturers();

    return {
      instrumentTypes: instrumentTypesRequest.data.content,
      manufacturers: manufacturersRequest.data.content,
      materials: instrumentBasicMaterialsRequest.data.content,
      countries: countriesRequest.data.content
    };
  };
