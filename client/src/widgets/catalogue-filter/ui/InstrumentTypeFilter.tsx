import React, { useEffect, useState } from "react";
import axios from "axios";
import { InstrumentTypes } from "domain/model/instrument-type";
import { SERVER_URL } from "shared/config";
import { API_INSTRUMENT_TYPES } from "shared/config/backend";

interface Props {
  onValueChange: (i: InstrumentTypes) => void;
}

export const InstrumentTypeFilter = ({ onValueChange }: Props) => {
  const [instrumentTypes, setInstrumentTypes] = useState<InstrumentTypes>([]);

  useEffect(() => {
    axios
      .get<InstrumentTypes>(`${SERVER_URL}${API_INSTRUMENT_TYPES}`)
      .then((r) => {
        setInstrumentTypes(r.data);
      })
      .catch((e) => {
        throw new Error(`Failed to extract instrument types: '${e}'`);
      });
  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      ".instrument-type-filter-checkbox",
    );

    onValueChange(
      Array.from(elements)
        .filter((inputTag) => inputTag.checked)
        .map((inputTag) => inputTag.name),
    );
  }

  return (
    <div id="instrument-type-filter">
      <legend>Type:</legend>
      {instrumentTypes.map((instrumentType) => (
        <div key={instrumentType}>
          <input
            type="checkbox"
            name={instrumentType}
            onChange={onChange}
            className="instrument-type-filter-checkbox"
            defaultChecked={true}
          />
          <label htmlFor={instrumentType}>{instrumentType}</label>
        </div>
      ))}
    </div>
  );
};
