import React, { useEffect, useState } from "react";
import { ManufacturerNames } from "@domain/model/manufacturer-name";
import axios from "axios";
import { InstrumentTypes } from "@domain/model/instrument-type";
import { SERVER_URL } from "shared/config";
import { API_INSTRUMENT_MATERIALS } from "shared/config/backend";
import { Materials } from "@domain/model/material";

interface Props {
  onValueChange: (names: ManufacturerNames) => void;
}

export const MaterialFilter = ({ onValueChange }: Props) => {

  const [materials, setMaterials] = useState<Materials>([]);

  useEffect(() => {
    axios.get<InstrumentTypes>(`${SERVER_URL}${API_INSTRUMENT_MATERIALS}`)
      .then(r => {
        setMaterials(r.data);
      })
      .catch(e => {
        throw new Error(`Failed to extract countries: '${e}'`);
      });

  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document
      .querySelectorAll(".materials-filter-checkbox");

    onValueChange(
      Array.from(elements)
        .filter(inputTag => inputTag.checked)
        .map(inputTag => inputTag.name)
    );
  }

  return (
    <div id="materials-filter">
      <legend>Основные инструменты:</legend>
      {materials.map(material => (
        <div key={material}>
          <input
            type="checkbox"
            id={material}
            name={material}
            className="materials-filter-checkbox"
            defaultChecked={true}
            onChange={onChange}
          />
          <label htmlFor={material}>{material}</label>
        </div>

      ))}
    </div>
  );
};
