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
}

export type Filters = {
  instrumentName: string | null;
  instrumentTypes: string[];
  manufacturerNames: string[];
  manufactureDateFrom: string | null;
  manufactureDateTo: string | null;
  releaseDateFrom: string | null;
  releaseDateTo: string | null;
  countries: string[];
  materials: string[];
};
