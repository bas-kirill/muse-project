import { InstrumentName } from "domain/model/instrument-name";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import { ManufactureDate } from "domain/model/manufacture-date";
import { InstrumentType } from "generated/model/instrument-type";

export type Filters = {
  instrumentName: InstrumentName | null;
  instrumentTypes: InstrumentType[] | null;
  manufacturerNames: ManufacturerNames | null;
  manufactureDateFrom: ManufactureDate | null;
  manufactureDateTo: ManufactureDate | null;
  releaseDateFrom: string | null;
  releaseDateTo: string | null;
  countries: string[] | null;
  materials: string[] | null;
  instrumentIds: number[] | null;
};

export const DEFAULT_FILTER = {
  instrumentName: null,
  instrumentTypes: null,
  manufacturerNames: null,
  manufactureDateFrom: null,
  manufactureDateTo: null,
  releaseDateFrom: null,
  releaseDateTo: null,
  countries: null,
  materials: null,
  instrumentIds: null,
};
