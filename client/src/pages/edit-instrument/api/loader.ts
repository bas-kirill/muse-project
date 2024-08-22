import { ManufacturerNames } from "domain/model/manufacturer-name";
import { Materials } from "domain/model/material";
import { Countries } from "domain/model/country";
import { LoaderFunction } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "shared/config";
import {
  API_COUNTRIES,
  API_MANUFACTURERS
} from "shared/config/backend";
import { GetInstrumentByIdApi } from "generated/api/get-instrument-by-id-api";
import { InstrumentBasicMaterial, InstrumentDetail, type InstrumentType } from "generated/model";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import { GetInstrumentBasicMaterialsApi } from "generated/api/get-instrument-basic-materials-api";

const getInstrumentById = new GetInstrumentByIdApi();
const getInstrumentTypes = new GetInstrumentTypesApi();
const getInstrumentBasicMaterials = new GetInstrumentBasicMaterialsApi();

export interface EditInstrumentLoader {
  instrumentForEdit: InstrumentDetail;
  instrumentTypes: InstrumentType[];
  manufacturerNames: ManufacturerNames;
  materials: InstrumentBasicMaterial[];
  countries: Countries;
}

export const loader: LoaderFunction = async ({
                                               params
                                             }): Promise<EditInstrumentLoader> => {
  const instrumentDetailRequest =
    await getInstrumentById.getInstrumentById(
      params.instrumentId as string
    );

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
    instrumentForEdit: instrumentDetailRequest.data,
    instrumentTypes: instrumentTypesRequest.data.content,
    manufacturerNames: manufacturers,
    materials: instrumentBasicMaterialsRequest.data.content,
    countries: countries
  };
};
