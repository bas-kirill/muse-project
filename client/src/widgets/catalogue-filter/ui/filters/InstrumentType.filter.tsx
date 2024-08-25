import React, { useEffect, useState } from "react";
import textStyle from "./Text.module.css";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import { InstrumentType } from "generated/model/instrument-type";

const getInstrumentTypes = new GetInstrumentTypesApi();

interface Props {
  onValueChange: (i: InstrumentType[]) => void;
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

    props.onValueChange(
      Array.from(elements)
        .filter((inputTag) => inputTag.checked)
        .map(
          (inputTag) =>
            ({
              instrument_type: inputTag.name,
            }) as InstrumentType,
        ),
    );
  }

  return (
    <div>
      <legend className={`${textStyle.primary}`} style={{ padding: "0" }}>
        Type
      </legend>
      {instrumentTypes.map((instrumentType) => (
        <div key={instrumentType.instrument_type}>
          <input
            type="checkbox"
            name={instrumentType.instrument_type}
            onChange={onChange}
            defaultChecked={true}
          />
          <label htmlFor={instrumentType.instrument_type}>
            {instrumentType.instrument_type}
          </label>
        </div>
      ))}
    </div>
  );
};
