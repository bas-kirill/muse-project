import React, { useEffect, useState } from "react";
import "./styles/CreateInstrumentCard.button.module.css";
import { Filters } from "widgets/catalogue-filter";
import { Role } from "domain/model/role";
import Jwt from "domain/model/jwt";
import {
  InstrumentType,
  BasicMaterial,
  Country,
  ManufactureDate,
  ManufacturerName,
  ReleaseDate,
} from "generated/model";
import { InstrumentTypeFilter } from "widgets/catalogue-filter/ui/filters/InstrumentType.filter";
import { ManufacturerNameFilter } from "widgets/catalogue-filter/ui/filters/ManufacturerName.filter";
import { ManufactureDateFilter } from "widgets/catalogue-filter/ui/filters/ManufactureDate.filter";
import { ReleaseDateFilter } from "widgets/catalogue-filter/ui/filters/ReleaseDate.filter";
import { CountryFilter } from "widgets/catalogue-filter/ui/filters/Country.filter";
import { MaterialFilter } from "widgets/catalogue-filter/ui/filters/Material.filter";
import { CreateInstrumentCardButton } from "widgets/catalogue-filter/ui/CreateInstrumentCard.button";

interface Props {
  onFilterChange: (filters: Filters) => void;
}

export const CatalogueFilterWidget = (props: Props) => {
  const [instrumentTypes, setInstrumentTypes] = useState<
    InstrumentType[] | null
  >(null);
  const [manufacturerNames, setManufacturerNames] = useState<
    ManufacturerName[] | null
  >(null);
  const [manufactureDateFrom, setManufactureDateFrom] =
    useState<ManufactureDate | null>(null);
  const [manufactureDateTo, setManufactureDateTo] =
    useState<ManufactureDate | null>(null);
  const [releaseDateFrom, setReleaseDateFrom] = useState<ReleaseDate | null>(
    null,
  );
  const [releaseDateTo, setReleaseDateTo] = useState<ReleaseDate | null>(null);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [materials, setMaterials] = useState<BasicMaterial[] | null>(null);

  useEffect(() => {
    props.onFilterChange({
      instrumentName: null,
      instrumentTypes: instrumentTypes,
      manufacturerNames: manufacturerNames,
      manufactureDateFrom: manufactureDateFrom,
      manufactureDateTo: manufactureDateTo,
      releaseDateFrom: releaseDateFrom,
      releaseDateTo: releaseDateTo,
      countries: countries,
      materials: materials,
      instrumentIds: null, // there is no such form field to search by instrument ids
    });
  }, [
    instrumentTypes,
    manufacturerNames,
    manufactureDateFrom,
    manufactureDateTo,
    releaseDateFrom,
    releaseDateTo,
    countries,
    materials,
  ]);

  return (
    <div>
      <InstrumentTypeFilter onValueChange={setInstrumentTypes} />
      <ManufacturerNameFilter onValueChange={setManufacturerNames} />

      <div>
        <legend>Manufacture Date:</legend>
        <ManufactureDateFilter
          onValueChange={setManufactureDateFrom}
          fieldName={"manufactureDateFrom"}
          labelName={"From"}
        />
        <ManufactureDateFilter
          onValueChange={setManufactureDateTo}
          fieldName={"manufactureDateTo"}
          labelName={"To"}
        />
      </div>

      <div>
        <legend>Release Date:</legend>
        <ReleaseDateFilter
          onValueChange={setReleaseDateFrom}
          fieldName={"releaseDateFrom"}
          labelName={"From"}
        />
        <ReleaseDateFilter
          onValueChange={setReleaseDateTo}
          fieldName={"releaseDateTo"}
          labelName={"To"}
        />
      </div>

      <CountryFilter onValueChange={setCountries} />
      <MaterialFilter onValueChange={setMaterials} />

      {Jwt.extractFromCookie()?.toRole() === Role.Editor && (
        <CreateInstrumentCardButton />
      )}
    </div>
  );
};
