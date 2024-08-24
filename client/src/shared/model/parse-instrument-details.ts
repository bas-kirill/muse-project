import {
  BasicMaterial,
  Country,
  InstrumentId,
  InstrumentName,
  InstrumentPhoto,
  ManufactureDate,
  ManufacturerName,
  ReleaseDate,
  InstrumentType,
} from "generated/model";

export const parseInstrumentDetails = (data: FormData) => {
  const errors = [];

  const instrumentId = {
    instrument_id: parseInt(data.get("instrument-id") as string),
  } as InstrumentId;

  const instrumentName = {
    instrument_name: data.get("instrument-name"),
  } as InstrumentName;
  if (instrumentName === null || instrumentName.instrument_name === "") {
    errors.push("Type instrument name");
  }

  const instrumentType = {
    instrument_type: data.get("instrument-type"),
  } as InstrumentType;
  if (instrumentType === null || instrumentType.instrument_type === "") {
    errors.push("Type instrument type");
  }

  const manufacturerName = {
    manufacturer_name: data.get("manufacturer-name"),
  } as ManufacturerName;
  if (manufacturerName === null || manufacturerName.manufacturer_name === "") {
    errors.push("Type manufacturer name");
  }

  const manufactureDate = {
    manufacture_date: data.get("manufacturer-date"),
  } as ManufactureDate;
  if (manufactureDate === null || manufactureDate.manufacture_date === "") {
    errors.push("Type manufacture date");
  }

  const releaseDate = {
    release_date: data.get("release-date"),
  } as ReleaseDate;
  if (releaseDate === null || releaseDate.release_date === "") {
    errors.push("Type release date");
  }

  if (
    manufactureDate.manufacture_date === "string" &&
    releaseDate.release_date === "string" &&
    Date.parse(releaseDate.release_date) <
      Date.parse(manufactureDate.manufacture_date)
  ) {
    errors.push("Release date must be after manufacture date");
  }

  const country = {
    country: data.get("country"),
  } as Country;

  if (country.country === null || country.country === "") {
    errors.push("Type country");
  }
  const materialsRaw = data.getAll("material") as string[];
  const materials: BasicMaterial[] = materialsRaw.map(
    (materialRaw) =>
      ({
        basic_material: materialRaw,
      }) as BasicMaterial,
  );

  const instrumentPhotoRaw = data.get("instrument-image");
  const instrumentPhoto = {
    photo: instrumentPhotoRaw,
  } as InstrumentPhoto;

  return {
    instrumentId,
    instrumentName,
    instrumentType,
    manufacturerName,
    manufactureDate,
    releaseDate,
    country,
    materials,
    instrumentPhoto,
    errors,
  } as {
    instrumentId: InstrumentId;
    instrumentName: InstrumentName;
    instrumentType: InstrumentType;
    manufacturerName: ManufacturerName;
    manufactureDate: ManufactureDate;
    releaseDate: ReleaseDate;
    country: Country;
    materials: BasicMaterial[];
    instrumentPhoto: InstrumentPhoto;
    errors: string[];
  };
};
