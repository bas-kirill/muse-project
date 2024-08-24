import { LoaderFunction } from "react-router-dom";
import { GetInstrumentByIdApi } from "generated/api/get-instrument-by-id-api";
import {
  BasicMaterial,
  Country,
  InstrumentDetail,
  InstrumentPhoto,
  type InstrumentType,
  Manufacturer,
} from "generated/model";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import { GetInstrumentBasicMaterialsApi } from "generated/api/get-instrument-basic-materials-api";
import { GetCountriesApi } from "generated/api/get-countries-api";
import { GetManufacturersApi } from "generated/api/get-manufacturers-api";
import { GetInstrumentPhotoApi } from "generated/api/get-instrument-photo-api";

const getInstrumentById = new GetInstrumentByIdApi();
const getInstrumentTypes = new GetInstrumentTypesApi();
const getInstrumentBasicMaterials = new GetInstrumentBasicMaterialsApi();
const getCountries = new GetCountriesApi();
const getManufacturers = new GetManufacturersApi();
const getInstrumentPhoto = new GetInstrumentPhotoApi();

export interface EditInstrumentLoader {
  instrumentForEdit: InstrumentDetail;
  instrumentTypes: InstrumentType[];
  manufacturers: Manufacturer[];
  materials: BasicMaterial[];
  countries: Country[];
  instrumentPhoto: InstrumentPhoto;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<EditInstrumentLoader> => {
  const instrumentDetailRequest = await getInstrumentById.getInstrumentById(
    parseInt(params.instrumentId as string),
  );

  const instrumentTypesRequest = await getInstrumentTypes.getInstrumentTypes();

  const instrumentBasicMaterialsRequest =
    await getInstrumentBasicMaterials.getInstrumentBasicMaterials();

  const countriesRequest = await getCountries.getCountries();
  const manufacturersRequest = await getManufacturers.getManufacturers();
  const instrumentPhotoRequest = await getInstrumentPhoto.getInstrumentPhoto(
    parseInt(params.instrumentId as string),
  );

  return {
    instrumentForEdit: instrumentDetailRequest.data,
    instrumentTypes: instrumentTypesRequest.data.content,
    manufacturers: manufacturersRequest.data.content,
    materials: instrumentBasicMaterialsRequest.data.content,
    countries: countriesRequest.data.content,
    instrumentPhoto: instrumentPhotoRequest.data,
  };
};
