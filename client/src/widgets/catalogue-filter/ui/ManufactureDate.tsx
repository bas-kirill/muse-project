import React, { ChangeEvent } from "react";
import { Checkboxes } from "widgets/catalogue-filter";

interface Props {
  checkboxes: Checkboxes;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ManufactureDate = ({ checkboxes, handleChange }: Props) => {
  return (
    <div id="manufacture-date">
      <legend>Дата изготовления</legend>
      <input
        type="date"
        name="manufactureDateFrom"
        value={checkboxes.manufactureDateFrom}
        onChange={handleChange}
        min="0001-01-01"
        max="9999-12-31"
      />
      <input
        type="date"
        name="manufactureDateTo"
        value={checkboxes.manufactureDateTo}
        onChange={handleChange}
        min="0001-01-01"
        max="9999-12-31"
      />
    </div>
  );
};
