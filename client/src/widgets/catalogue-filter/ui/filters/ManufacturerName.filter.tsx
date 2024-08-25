import React, { useEffect, useState } from "react";
import { GetManufacturersApi } from "generated/api/get-manufacturers-api";
import { Manufacturer, ManufacturerName } from "generated/model";

interface Props {
  onValueChange: (names: ManufacturerName[]) => void;
}

const getManufacturers = new GetManufacturersApi();

export const ManufacturerNameFilter = ({ onValueChange }: Props) => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  useEffect(() => {
    const fetchManufacturers = async () => {
      const response = await getManufacturers.getManufacturers();
      setManufacturers(response.data.content);
    };

    fetchManufacturers();
  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      ".manufacturer-name-filter-checkbox",
    );

    onValueChange(
      Array.from(elements)
        .filter((inputTag) => inputTag.checked)
        .map(
          (inputTag) =>
            ({
              manufacturer_name: inputTag.name,
            }) as ManufacturerName,
        ),
    );
  }

  return (
    <div>
      <legend style={{ padding: "0" }}>Manufacturer</legend>
      {manufacturers.map((manufacturer) => (
        <div key={manufacturer.manufacturer}>
          <input
            type="checkbox"
            name={manufacturer.manufacturer}
            onChange={onChange}
            defaultChecked={true}
          />
          <label htmlFor={manufacturer.manufacturer} style={{ padding: "0" }}>
            {manufacturer.manufacturer}
          </label>
        </div>
      ))}
    </div>
  );
};
