import React, { useEffect, useState } from "react";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import { InstrumentType } from "generated/model/instrument-type";
import { apiConfig } from "shared/config/api";
import { InstrumentTypeCode } from "generated/model";

const getInstrumentTypes = new GetInstrumentTypesApi(apiConfig);

interface Props {
  setInstrumentTypes: (i: InstrumentTypeCode[]) => void;
}

export const InstrumentTypeFilter = (props: Props) => {
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
              value: inputTag.value,
            }) as InstrumentTypeCode,
        ),
    );
  }

  return (
    <div>
      <legend style={{ padding: "0" }}>Type</legend>
      {instrumentTypes.map((instrumentType) => (
        <div key={instrumentType.code.value}>
          <input
            type="checkbox"
            name={instrumentType.code.value}
            onChange={onChange}
            defaultChecked={true}
            className={"instrument-type-filter-checkbox"} // required plain text class to extract values from it
          />
          <label htmlFor={instrumentType.code.value}>
            {instrumentType.localized_text}
          </label>
        </div>
      ))}
    </div>
  );
};
