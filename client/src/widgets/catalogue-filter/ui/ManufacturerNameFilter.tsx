import React, { useEffect, useState } from "react";
import { ManufacturerNames } from "domain/model/manufacturer-name";
import { GetManufacturersApi } from "generated/api/get-manufacturers-api";
import { Manufacturer } from "generated/model";

interface Props {
  onValueChange: (names: ManufacturerNames) => void;
}

const getManufacturers = new GetManufacturersApi();

export const ManufacturerNameFilter = ({ onValueChange }: Props) => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>(
    [],
  );

  useEffect(() => {
    const fetchManufacturers = async () => {
      const response = await getManufacturers.getManufacturers();
      setManufacturers(response.data.content);
    }

    fetchManufacturers();
  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      ".manufacturer-name-filter-checkbox",
    );

    onValueChange(
      Array.from(elements)
        .filter((inputTag) => inputTag.checked)
        .map((inputTag) => inputTag.name),
    );
  }

  return (
    <div id="manufacturer-name-filter">
      <legend>Manufacturer:</legend>
      {manufacturers.map((manufacturer) => (
        <div key={manufacturer.manufacturer}>
          <input
            type="checkbox"
            name={manufacturer.manufacturer}
            onChange={onChange}
            className="manufacturer-name-filter-checkbox"
            defaultChecked={true}
          />
          <label htmlFor={manufacturer.manufacturer}>{manufacturer.manufacturer}</label>
        </div>
      ))}
    </div>
  );
};
