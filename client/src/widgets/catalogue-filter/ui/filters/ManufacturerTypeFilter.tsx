import React, { useEffect, useState } from "react";
import { GetManufacturersApi } from "generated/api/get-manufacturers-api";
import { ManufactureType } from "generated/model";
import { apiConfig } from "shared/config/api";
import { I18N_INSTRUMENT_CARD_MANUFACTURER } from "../../../../i18n";
import { useTranslation } from "react-i18next";

interface Props {
  onValueChange: (names: ManufactureType[]) => void;
}

const getManufacturers = new GetManufacturersApi(apiConfig);

export const ManufacturerTypeFilter = ({ onValueChange }: Props) => {
  const { t } = useTranslation();
  const [manufacturers, setManufacturers] = useState<ManufactureType[]>([]);

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
              i18n_code: inputTag.name,
            }) as ManufactureType,
        ),
    );
  }

  return (
    <div>
      <legend style={{ padding: "0" }}>
        {t(I18N_INSTRUMENT_CARD_MANUFACTURER)}
      </legend>
      {manufacturers.map((manufacturer) => (
        <div key={manufacturer.i18n_code}>
          <input
            type="checkbox"
            name={manufacturer.i18n_code}
            onChange={onChange}
            defaultChecked={true}
          />
          <label htmlFor={manufacturer.i18n_code} style={{ padding: "0" }}>
            {manufacturer.localized_message}
          </label>
        </div>
      ))}
    </div>
  );
};
