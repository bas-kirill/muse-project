import React, { useEffect, useState } from "react";
import { GetCountriesApi } from "generated/api/get-countries-api";
import { Country } from "generated/model";
import { apiConfig } from "shared/config/api";
import { I18N_COUNTRY } from "../../../../i18n";
import { useTranslation } from "react-i18next";

interface Props {
  onValueChange: (names: Country[]) => void;
}

const getCountries = new GetCountriesApi(apiConfig);

export const CountryFilter = ({ onValueChange }: Props) => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await getCountries.getCountries();
      setCountries(response.data.content);
    };
    fetchCountries();
  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      ".country-filter-checkbox",
    );

    onValueChange(
      Array.from(elements)
        .filter((inputTag) => inputTag.checked)
        .map(
          (inputTag) =>
            ({
              country: inputTag.name,
            }) as Country,
        ),
    );
  }

  return (
    <div>
      <legend style={{ padding: "0" }}>{t(I18N_COUNTRY)}</legend>
      {countries.map((country) => (
        <div key={country.country}>
          <input
            type="checkbox"
            name={country.country}
            onChange={onChange}
            defaultChecked={true}
          />
          <label htmlFor={country.country}>{country.country}</label>
        </div>
      ))}
    </div>
  );
};
