import React, { ChangeEvent, useEffect, useState } from "react";
import "./CreateInstrumentCardButton.css";
import {
  Checkboxes,
  DEFAULT_CHECKBOX,
  Filters,
} from "widgets/catalogue-filter";
import { transformCheckboxesToFilters } from "../model/transformCheckboxesToFilters";
import { InstrumentType } from "./InstrumentType";
import { ManufacturerName } from "./ManufacturerName";
import { ManufactureDate } from "./ManufactureDate";
import { ReleaseDate } from "./ReleaseDate";
import { Country } from "./Country";
import { BasicMaterials } from "./BasicMaterials";
import { Role } from "domain/model/role";
import { CreateInstrumentCardButton } from "./CreateInstrumentCardButton";

interface Props {
  onFilterChange: (filters: Filters) => void;
  role: Role | undefined;
}

export const CatalogueFilterWidget = ({ onFilterChange, role }: Props) => {
  const [checkboxes, setCheckboxes] = useState<Checkboxes>(DEFAULT_CHECKBOX);

  useEffect(() => {
    onFilterChange(transformCheckboxesToFilters(checkboxes));
  }, [checkboxes]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div id="catalogue-filters">
      <InstrumentType checkboxes={checkboxes} handleChange={handleChange} />
      <ManufacturerName checkboxes={checkboxes} handleChange={handleChange} />
      <ManufactureDate checkboxes={checkboxes} handleChange={handleChange} />
      <ReleaseDate checkboxes={checkboxes} handleChange={handleChange} />
      <Country checkboxes={checkboxes} handleChange={handleChange} />
      <BasicMaterials checkboxes={checkboxes} handleChange={handleChange} />
      {(role === Role.Editor) && (
        <CreateInstrumentCardButton />
      )}
    </div>
  );
};
