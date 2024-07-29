import { Checkboxes, Filters } from "widgets/catalogue-filter";

export const transformCheckboxesToFilters = (
  checkboxes: Checkboxes,
): Filters => {
  const instrumentTypes = ["KEYBOARD", "STRINGED", "WIND"].filter(
    (type) => checkboxes[type as keyof Checkboxes],
  );
  const manufacturerNames = [];
  if (checkboxes.audiocom) {
    manufacturerNames.push("audio.com");
  }
  if (checkboxes.yamaha) {
    manufacturerNames.push("Yamaha");
  }
  const countries = [];
  if (checkboxes.cyprus) {
    countries.push("CYPRUS");
  }
  if (checkboxes.usa) {
    countries.push("USA");
  }
  const materials = [];
  if (checkboxes.metall) {
    materials.push("METALL");
  }
  if (checkboxes.wood) {
    materials.push("WOOD");
  }

  return {
    instrumentName: null,
    instrumentTypes: instrumentTypes,
    manufacturerNames: manufacturerNames,
    manufactureDateFrom:
      checkboxes.manufactureDateFrom === ""
        ? null
        : checkboxes.manufactureDateFrom,
    manufactureDateTo:
      checkboxes.manufactureDateTo === "" ? null : checkboxes.manufactureDateTo,
    releaseDateFrom:
      checkboxes.releaseDateFrom === "" ? null : checkboxes.releaseDateFrom,
    releaseDateTo:
      checkboxes.releaseDateTo === "" ? null : checkboxes.releaseDateTo,
    countries: countries,
    materials: materials,
  };
};
