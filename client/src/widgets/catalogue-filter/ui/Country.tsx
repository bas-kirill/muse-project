import React, { ChangeEvent } from "react";
import { Checkboxes } from "widgets/catalogue-filter";

interface Props {
  checkboxes: Checkboxes;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Country = ({ checkboxes, handleChange }: Props) => {
  return (
    <div id="country">
      <legend>Страна:</legend>
      <div>
        <input
          type="checkbox"
          name="usa"
          checked={checkboxes.usa}
          onChange={handleChange}
        />
        <label htmlFor="usa">США</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="cyprus"
          checked={checkboxes.cyprus}
          onChange={handleChange}
        />
        <label htmlFor="cyprus">Кипр</label>
      </div>
    </div>
  );
};