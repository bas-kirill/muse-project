import { InstrumentTypes } from "domain/model/instrument-type";
import { InstrumentName } from "domain/model/instrument-name";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import { ManufactureDate } from "domain/model/manufacture-date";

export type Filters = {
  instrumentName: InstrumentName | null;
  instrumentTypes: InstrumentTypes | null;
  manufacturerNames: ManufacturerNames | null;
  manufactureDateFrom: ManufactureDate | null;
  manufactureDateTo: ManufactureDate | null;
  releaseDateFrom: string | null;
  releaseDateTo: string | null;
  countries: string[] | null;
  materials: string[] | null;
};
