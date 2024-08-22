import { InstrumentName } from "domain/model/instrument-name";
import { ManufacturerName } from "domain/model/manufacturer-name";
import { ManufactureDate } from "domain/model/manufacture-date";
import { ReleaseDate } from "domain/model/release-date";
import { InstrumentId } from "domain/model/instrument-id";
import { InstrumentType } from "generated/model/instrument-type";
import { Country, InstrumentBasicMaterial } from "generated/model";

export const parseInstrumentDetails = (data: FormData) => {
  const errors = [];

  const instrumentId = InstrumentId.from(
    parseInt(data.get("instrument-id") as string),
  );

  const instrumentName = data.get("instrument-name");
  if (
    instrumentName === null ||
    typeof instrumentName !== "string" ||
    instrumentName === ""
  ) {
    errors.push("Type instrument name");
  }

  const instrumentType = data.get("instrument-type");
  if (
    instrumentType === null ||
    typeof instrumentType !== "string" ||
    instrumentType === ""
  ) {
    errors.push("Type instrument type");
  }

  const manufacturerName = data.get("manufacturer-name");
  if (
    manufacturerName === null ||
    typeof manufacturerName !== "string" ||
    manufacturerName === ""
  ) {
    errors.push("Type manufacturer name");
  }

  const manufactureDate = data.get("manufacturer-date");
  if (
    manufactureDate === null ||
    typeof manufactureDate !== "string" ||
    manufactureDate === ""
  ) {
    errors.push("Type manufacture date");
  }

  const releaseDate = data.get("release-date");
  if (
    releaseDate === null ||
    typeof manufactureDate !== "string" ||
    releaseDate === ""
  ) {
    errors.push("Type release date");
  }

  if (
    manufactureDate === "string" &&
    releaseDate === "string" &&
    Date.parse(releaseDate) < Date.parse(manufactureDate)
  ) {
    errors.push("Release date must be after manufacture date");
  }

  const country = {
    country: data.get("country"),
  } as Country;

  if (
    country.country === null ||
    typeof country.country !== "string" ||
    country.country === ""
  ) {
    errors.push("Type country");
  }
  const materialsRaw = data.getAll("material") as string[];
  const materials: InstrumentBasicMaterial[] = materialsRaw.map(
    (materialRaw) =>
      ({
        basic_material: materialRaw,
      }) as InstrumentBasicMaterial,
  );

  return {
    instrumentId,
    instrumentName,
    instrumentType,
    manufacturerName,
    manufactureDate,
    releaseDate,
    country,
    materials,
    errors,
  } as {
    instrumentId: InstrumentId;
    instrumentName: InstrumentName;
    instrumentType: InstrumentType;
    manufacturerName: ManufacturerName;
    manufactureDate: ManufactureDate;
    releaseDate: ReleaseDate;
    country: Country;
    materials: InstrumentBasicMaterial[];
    errors: string[];
  };
};
