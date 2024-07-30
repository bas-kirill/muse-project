import { InstrumentTypes } from "@domain/model/instrument-type";
import { InstrumentName } from "@domain/model/instrument-name";
import { ManufacturerNames } from "@domain/model/manufacturer-name";
import { ManufactureDate } from "@domain/model/manufacture-date";

export type Checkboxes = {
  KEYBOARD: boolean;
  STRINGED: boolean;
  WIND: boolean;
  audiocom: boolean;
  yamaha: boolean;
  manufactureDateFrom: string;
  manufactureDateTo: string;
  releaseDateFrom: string;
  releaseDateTo: string;
  usa: boolean;
  cyprus: boolean;
  wood: boolean;
  metall: boolean;
};

export const DEFAULT_CHECKBOX: Checkboxes = {
  KEYBOARD: true,
  STRINGED: true,
  WIND: true,
  audiocom: true,
  yamaha: true,
  manufactureDateFrom: "",
  manufactureDateTo: "",
  releaseDateFrom: "",
  releaseDateTo: "",
  usa: true,
  cyprus: true,
  wood: true,
  metall: true,
};

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
