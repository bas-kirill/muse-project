import { InstrumentName } from "domain/model/instrument-name";
import { InstrumentType } from "domain/model/instrument-type";
import { ManufacturerName } from "domain/model/manufacturer-name";
import { ManufactureDate } from "domain/model/manufacture-date";
import { ReleaseDate } from "domain/model/release-date";
import { Country } from "domain/model/country";
import { Materials } from "domain/model/material";

export interface Instrument {
  id: number;
  name: InstrumentName;
  type: InstrumentType;
  manufacturer: ManufacturerName;
  manufacturerDate: ManufactureDate;
  releaseDate: ReleaseDate;
  country: Country;
  basicMaterials: Materials;
}

export type Instruments = Instrument[];
