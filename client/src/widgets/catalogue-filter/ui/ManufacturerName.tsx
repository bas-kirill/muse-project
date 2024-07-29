import React, { ChangeEvent } from "react";
import { Checkboxes } from "widgets/catalogue-filter";

interface Props {
  checkboxes: Checkboxes;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ManufacturerName = ({ checkboxes, handleChange }: Props) => {
  return (
    <div id="manufacturer-name">
      <legend>Производитель:</legend>
      <div>
        <input
          type="checkbox"
          id="audiocom"
          name="audiocom"
          checked={checkboxes.audiocom}
          onChange={handleChange}
        />
        <label htmlFor="audiocom">audio.com</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="yamaha"
          name="yamaha"
          checked={checkboxes.yamaha}
          onChange={handleChange}
        />
        <label htmlFor="yamaha">Yamaha</label>
      </div>
    </div>
  );
}