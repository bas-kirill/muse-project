import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Checkboxes,
  DEFAULT_CHECKBOX,
  Filters,
} from "widgets/catalogue-filter";
import { transformCheckboxesToFilters } from "../model/transformCheckboxesToFilters";
import { InstrumentType } from "widgets/catalogue-filter/ui/InstrumentType";
import { ManufacturerName } from "widgets/catalogue-filter/ui/ManufacturerName";
import { ManufactureDate } from "widgets/catalogue-filter/ui/ManufactureDate";
import { ReleaseDate } from "widgets/catalogue-filter/ui/ReleaseDate";
import { Country } from "widgets/catalogue-filter/ui/Country";
import { BasicMaterials } from "widgets/catalogue-filter/ui/BasicMaterials";

interface Props {
  onFilterChange: (filters: Filters) => void;
}

export const CatalogueFilterWidget = ({ onFilterChange }: Props) => {
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
    </div>
  );
};
