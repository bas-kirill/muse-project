import React, { ChangeEvent } from "react";
import { Checkboxes } from "widgets/catalogue-filter";

interface Props {
  checkboxes: Checkboxes;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ReleaseDate = ({ checkboxes, handleChange }: Props) => {
  return (
    <div id="release-date">
      <legend>Дата выпуска:</legend>
      <input
        type="date"
        name="releaseDateFrom"
        value={checkboxes.releaseDateFrom}
        onChange={handleChange}
        min="0001-01-01"
        max="9999-12-31"
      />
      <input
        type="date"
        name="releaseDateTo"
        value={checkboxes.releaseDateTo}
        onChange={handleChange}
        min="0001-01-01"
        max="9999-12-31"
      />
    </div>
  );
}