import {
  BasicMaterial,
  Country,
  InstrumentId,
  InstrumentName,
  InstrumentType,
  ManufactureDate,
  ManufacturerName,
  ReleaseDate,
} from "generated/model";

export type Filters = {
  instrumentName: InstrumentName | null;
  instrumentTypes: InstrumentType[] | null;
  manufacturerNames: ManufacturerName[] | null;
  manufactureDateFrom: ManufactureDate | null;
  manufactureDateTo: ManufactureDate | null;
  releaseDateFrom: ReleaseDate | null;
  releaseDateTo: ReleaseDate | null;
  countries: Country[] | null;
  materials: BasicMaterial[] | null;
  instrumentIds: InstrumentId[] | null;
};
