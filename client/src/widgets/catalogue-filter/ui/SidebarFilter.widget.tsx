import React, { useEffect, useState } from "react";
import styles from "./styles/SidebarFilter.widget.module.css";
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

export const SidebarFilterWidget = (props: Props) => {
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
    <div className={styles.filter_sidebar}>
      <div className={styles.filter__wrapper}>
        <InstrumentTypeFilter onValueChange={setInstrumentTypes} />
      </div>
      <div className={styles.filter__wrapper}>
        <ManufacturerNameFilter onValueChange={setManufacturerNames} />
      </div>

      <div className={styles.filter__wrapper}>
        <legend style={{ padding: "0" }}>Manufacture Date</legend>

        <div className={styles.vertical__wrapper}>
          <ManufactureDateFilter
            onValueChange={setManufactureDateFrom}
            fieldName={"manufactureDateFrom"}
            labelName={""}
          />

          <ManufactureDateFilter
            onValueChange={setManufactureDateTo}
            fieldName={"manufactureDateTo"}
            labelName={""}
          />
        </div>
      </div>

      <div className={styles.filter__wrapper}>
        <legend style={{ padding: "0" }}>Release Date</legend>
        <div className={styles.vertical__wrapper}>
          <ReleaseDateFilter
            onValueChange={setReleaseDateFrom}
            fieldName={"releaseDateFrom"}
            labelName={""}
          />
          <ReleaseDateFilter
            onValueChange={setReleaseDateTo}
            fieldName={"releaseDateTo"}
            labelName={""}
          />
        </div>
      </div>

      <div className={styles.filter__wrapper}>
        <CountryFilter onValueChange={setCountries} />
      </div>

      <div className={styles.filter__wrapper}>
        <MaterialFilter onValueChange={setMaterials} />
      </div>

      {Jwt.extractFromCookie()?.toRole() === Role.Editor && (
        <CreateInstrumentCardButton />
      )}
    </div>
  );
};
