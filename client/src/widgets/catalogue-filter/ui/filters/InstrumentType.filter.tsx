import React, { useEffect, useState } from "react";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import { InstrumentType } from "generated/model/instrument-type";
import { apiConfig } from "shared/config/api";
import { useTranslation } from "react-i18next";
import { I18N_INSTRUMENT_TYPE_FILTER } from "../../../../i18n";

const getInstrumentTypes = new GetInstrumentTypesApi(apiConfig);

interface Props {
  setInstrumentTypes: (i: InstrumentType[]) => void;
}

export const InstrumentTypeFilter = (props: Props) => {
  const { t } = useTranslation();
  const [instrumentTypes, setInstrumentTypes] = useState<InstrumentType[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await getInstrumentTypes.getInstrumentTypes();
      setInstrumentTypes(response.data.content);
    };

    fetchTypes();
  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      ".instrument-type-filter-checkbox",
    );

    props.setInstrumentTypes(
      Array.from(elements)
        .filter((inputTag) => inputTag.checked)
        .map(
          (inputTag) =>
            ({
              code: inputTag.name,
            }) as InstrumentType,
        ),
    );
  }

  return (
    <div>
      <legend style={{ padding: "0" }}>{t(I18N_INSTRUMENT_TYPE_FILTER)}</legend>
      {instrumentTypes.map((instrumentType) => (
        <div key={instrumentType.code}>
          <input
            type="checkbox"
            name={instrumentType.code}
            onChange={onChange}
            defaultChecked={true}
            className={"instrument-type-filter-checkbox"} // required plain text class to extract values from it
          />
          <label htmlFor={instrumentType.code}>
            {instrumentType.localized_text}
          </label>
        </div>
      ))}
    </div>
  );
};
