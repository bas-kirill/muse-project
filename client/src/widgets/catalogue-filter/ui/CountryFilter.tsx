import React, { useEffect, useState } from "react";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import axios from "axios";
import { InstrumentTypes } from "domain/model/instrument-type";
import { SERVER_URL } from "shared/config";
import { API_COUNTRIES } from "shared/config/backend";
import { Countries } from "domain/model/country";

interface Props {
  onValueChange: (names: ManufacturerNames) => void;
}

export const CountryFilter = ({ onValueChange }: Props) => {
  const [countries, setCountries] = useState<Countries>([]);

  useEffect(() => {
    axios
      .get<InstrumentTypes>(`${SERVER_URL}${API_COUNTRIES}`)
      .then((r) => {
        setCountries(r.data);
      })
      .catch((e) => {
        throw new Error(`Failed to extract countries: '${e}'`);
      });
  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      ".country-filter-checkbox",
    );

    onValueChange(
      Array.from(elements)
        .filter((inputTag) => inputTag.checked)
        .map((inputTag) => inputTag.name),
    );
  }

  return (
    <div id="country-filter">
      <legend>Country:</legend>
      {countries.map((country) => (
        <div key={country}>
          <input
            type="checkbox"
            name={country}
            onChange={onChange}
            className="country-filter-checkbox"
            defaultChecked={true}
          />
          <label htmlFor={country}>{country}</label>
        </div>
      ))}
    </div>
  );
};
