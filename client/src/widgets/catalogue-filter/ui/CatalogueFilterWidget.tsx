import React, { useEffect, useState } from "react";
import "./styles/CreateInstrumentCardButton.css";
import { Filters } from "widgets/catalogue-filter";
import { InstrumentTypeFilter } from "./filters/InstrumentTypeFilter";
import { Role } from "domain/model/role";
import { CreateInstrumentCardButton } from "./CreateInstrumentCardButton";
import { ManufacturerNameFilter } from "widgets/catalogue-filter/ui/filters/ManufacturerNameFilter";
import { ManufactureDateFilter } from "widgets/catalogue-filter/ui/filters/ManufactureDateFilter";
import { CountryFilter } from "widgets/catalogue-filter/ui/filters/CountryFilter";
import { MaterialFilter } from "widgets/catalogue-filter/ui/filters/MaterialFilter";
import Jwt from "domain/model/jwt";
import { InstrumentType } from "generated/model/instrument-type";
import {
  BasicMaterial,
  Country,
  ManufactureDate,
  ManufacturerName,
  ReleaseDate,
} from "generated/model";
import { ReleaseDateFilter } from "widgets/catalogue-filter/ui/filters/ReleaseDateFilter";

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
      instrumentIds: null, // there is no such field to search by instrument ids
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
    <div id="catalogue-filters">
      <InstrumentTypeFilter onValueChange={setInstrumentTypes} />
      <ManufacturerNameFilter onValueChange={setManufacturerNames} />
      <div id="manufacture-date-filter">
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
      <div id="release-date-filter">
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
