import { LoaderFunction } from "react-router-dom";
import { GetInstrumentByIdApi } from "generated/api/get-instrument-by-id-api";
import {
  BasicMaterial,
  Country,
  InstrumentDetail,
  type InstrumentType,
  Manufacturer,
} from "generated/model";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import { GetInstrumentBasicMaterialsApi } from "generated/api/get-instrument-basic-materials-api";
import { GetCountriesApi } from "generated/api/get-countries-api";
import { GetManufacturersApi } from "generated/api/get-manufacturers-api";

const getInstrumentById = new GetInstrumentByIdApi();
const getInstrumentTypes = new GetInstrumentTypesApi();
const getInstrumentBasicMaterials = new GetInstrumentBasicMaterialsApi();
const getCountries = new GetCountriesApi();
const getManufacturers = new GetManufacturersApi();

export interface EditInstrumentLoader {
  instrumentForEdit: InstrumentDetail;
  instrumentTypes: InstrumentType[];
  manufacturers: Manufacturer[];
  materials: BasicMaterial[];
  countries: Country[];
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<EditInstrumentLoader> => {
  const instrumentDetailRequest = await getInstrumentById.getInstrumentById(
    params.instrumentId as string,
  );

  const instrumentTypesRequest = await getInstrumentTypes.getInstrumentTypes();

  const instrumentBasicMaterialsRequest =
    await getInstrumentBasicMaterials.getInstrumentBasicMaterials();

  const countriesRequest = await getCountries.getCountries();
  const manufacturersRequest = await getManufacturers.getManufacturers();

  return {
    instrumentForEdit: instrumentDetailRequest.data,
    instrumentTypes: instrumentTypesRequest.data.content,
    manufacturers: manufacturersRequest.data.content,
    materials: instrumentBasicMaterialsRequest.data.content,
    countries: countriesRequest.data.content,
  };
};
