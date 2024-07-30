import React, { useEffect, useState } from "react";
import { InstrumentTypes } from "domain/model/instrument-type";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import axios from "axios";
import { SERVER_URL } from "shared/config";
import { API_MANUFACTURERS } from "shared/config/backend";

interface Props {
  onValueChange: (names: ManufacturerNames) => void;
}

export const ManufacturerNameFilter = ({ onValueChange }: Props) => {
  const [manufacturerNames, setManufacturerNames] = useState<ManufacturerNames>([]);

  useEffect(() => {
    axios.get<InstrumentTypes>(`${SERVER_URL}${API_MANUFACTURERS}`)
      .then(r => {
        setManufacturerNames(r.data);
      })
      .catch(e => {
        throw new Error(`Failed to extract instrument types: '${e}'`);
      });

  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document
      .querySelectorAll(".manufacturer-name-filter-checkbox");

    onValueChange(
      Array.from(elements)
        .filter(inputTag => inputTag.checked)
        .map(inputTag => inputTag.name)
    );
  }

  return (
    <div id="manufacturer-name-filter">
      <legend>Manufacturer:</legend>
      {manufacturerNames.map(manufactureName => (
        <div key={manufactureName}>
          <input type="checkbox" name={manufactureName} onChange={onChange}
                 className="manufacturer-name-filter-checkbox" defaultChecked={true} />
          <label htmlFor={manufactureName}>{manufactureName}</label>
        </div>
      ))}
    </div>
  );
};
