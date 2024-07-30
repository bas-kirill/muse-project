import { InstrumentName } from "domain/model/instrument-name";
import { InstrumentType } from "domain/model/instrument-type";
import { ManufacturerName } from "domain/model/manufacturer-name";
import { ManufactureDate } from "domain/model/manufacture-date";
import { ReleaseDate } from "domain/model/release-date";
import { Country } from "domain/model/country";
import { Material } from "domain/model/material";

export const parseInstrumentDetails = (data: FormData) => {
  const errors = [];

  const instrumentName = data.get("instrument-name");
  if (instrumentName === null || typeof instrumentName !== "string" || instrumentName === "") {
    errors.push("Type instrument name");
  }

  const instrumentType = data.get("instrument-type");
  if (instrumentType === null || typeof instrumentType !== "string" || instrumentType === "") {
    errors.push("Type instrument type");
  }

  const manufacturerName = data.get("manufacturer-name");
  if (manufacturerName === null || typeof manufacturerName !== "string" || manufacturerName === "") {
    errors.push("Type manufacturer name");
  }

  const manufactureDate = data.get("manufacturer-date");
  if (manufactureDate === null || typeof manufactureDate !== "string" || manufactureDate === "") {
    errors.push("Type manufacture date");
  }

  const releaseDate = data.get("release-date");
  const country = data.get("country");
  const material = data.get("material");

  return {
    instrumentName,
    instrumentType,
    manufacturerName,
    manufactureDate,
    releaseDate,
    country,
    material,
    errors
  } as {
    instrumentName: InstrumentName;
    instrumentType: InstrumentType;
    manufacturerName: ManufacturerName;
    manufactureDate: ManufactureDate;
    releaseDate: ReleaseDate;
    country: Country;
    material: Material;
    errors: string[];
  };
};