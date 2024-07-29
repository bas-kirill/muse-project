import React, { ChangeEvent } from "react";
import { Checkboxes } from "widgets/catalogue-filter";

interface Props {
  checkboxes: Checkboxes;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const BasicMaterials = ({ checkboxes, handleChange }: Props) => {
  return (
    <div id="basic-materials">
      <legend>Основные инструменты:</legend>
      <div>
        <input
          type="checkbox"
          id="wood"
          name="wood"
          checked={checkboxes.wood}
          onChange={handleChange}
        />
        <label htmlFor="wood">Дерево</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="metall"
          name="metall"
          checked={checkboxes.metall}
          onChange={handleChange}
        />
        <label htmlFor="metall">Металл</label>
      </div>
    </div>
  );
}