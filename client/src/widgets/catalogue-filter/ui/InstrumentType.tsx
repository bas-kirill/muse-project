import React, { ChangeEvent } from "react";
import { Checkboxes } from "widgets/catalogue-filter";

interface Props {
  checkboxes: Checkboxes;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InstrumentType = ({ checkboxes, handleChange }: Props) => {
  return (
    <div id="instrument-type">
      <legend>Тип:</legend>
      <div>
        <input
          type="checkbox"
          id="keyboard"
          name="KEYBOARD"
          checked={checkboxes.KEYBOARD}
          onChange={handleChange}
        />
        <label htmlFor="keyboard">Клавишный</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="stringed"
          name="STRINGED"
          checked={checkboxes.STRINGED}
          onChange={handleChange}
        />
        <label htmlFor="stringed">Струнный</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="wind"
          name="WIND"
          checked={checkboxes.WIND}
          onChange={handleChange}
        />
        <label htmlFor="wind">Духовой</label>
      </div>
    </div>
  )
}