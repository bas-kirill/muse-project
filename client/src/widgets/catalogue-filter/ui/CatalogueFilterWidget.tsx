import React, { useEffect, useState } from "react";
import "./CreateInstrumentCardButton.css";
import { Filters } from "widgets/catalogue-filter";
import { InstrumentTypeFilter } from "./InstrumentTypeFilter";
import { Role } from "domain/model/role";
import { CreateInstrumentCardButton } from "./CreateInstrumentCardButton";
import { InstrumentTypes } from "domain/model/instrument-type";
import { ManufacturerNameFilter } from "widgets/catalogue-filter/ui/ManufacturerNameFilter";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import { DateFilter } from "widgets/catalogue-filter/ui/DateFilter";
import { ManufactureDate } from "domain/model/manufacture-date";
import { CountryFilter } from "widgets/catalogue-filter/ui/CountryFilter";
import { Countries } from "domain/model/country";
import { ReleaseDate } from "domain/model/release-date";
import { MaterialFilter } from "widgets/catalogue-filter/ui/MaterialFilter";
import { Materials } from "domain/model/material";
import Jwt from "domain/model/jwt";

interface Props {
  onFilterChange: (filters: Filters) => void;
}

export const CatalogueFilterWidget = (props: Props) => {
  const [instrumentTypes, setInstrumentTypes] =
    useState<InstrumentTypes | null>(null);
  const [manufacturerNames, setManufacturerNames] =
    useState<ManufacturerNames | null>(null);
  const [manufactureDateFrom, setManufactureDateFrom] =
    useState<ManufactureDate | null>(null);
  const [manufactureDateTo, setManufactureDateTo] =
    useState<ManufactureDate | null>(null);
  const [releaseDateFrom, setReleaseDateFrom] = useState<ReleaseDate | null>(
    null,
  );
  const [releaseDateTo, setReleaseDateTo] = useState<ReleaseDate | null>(null);
  const [countries, setCountries] = useState<Countries | null>(null);
  const [materials, setMaterials] = useState<Materials | null>(null);

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
        <DateFilter
          onValueChange={setManufactureDateFrom}
          fieldName={"manufactureDateFrom"}
          labelName={"From"}
        />
        <DateFilter
          onValueChange={setManufactureDateTo}
          fieldName={"manufactureDateTo"}
          labelName={"To"}
        />
      </div>
      <div id="release-date-filter">
        <legend>Release Date:</legend>
        <DateFilter
          onValueChange={setReleaseDateFrom}
          fieldName={"releaseDateFrom"}
          labelName={"From"}
        />
        <DateFilter
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
