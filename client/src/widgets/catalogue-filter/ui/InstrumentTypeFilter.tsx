import React, { useEffect, useState } from "react";
import { GetInstrumentTypesApi } from "generated/api/get-instrument-types-api";
import { InstrumentType } from "generated/model/instrument-type";

const getInstrumentTypes = new GetInstrumentTypesApi();

interface Props {
  onValueChange: (i: InstrumentType[]) => void;
}

export const InstrumentTypeFilter = (props: Props) => {
  const [instrumentTypes, setInstrumentTypes] = useState<InstrumentType[]>([]);

  useEffect(() => {
    getInstrumentTypes
      .getInstrumentTypes()
      .then((r) => {
        setInstrumentTypes(r.data.content);
      })
      .catch((e) => {
        throw new Error(`Failed to extract instrument types: '${e}'`);
      });
  }, []);

  function onChange() {
    const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      ".instrument-type-filter-checkbox"
    );

    props.onValueChange(
      Array.from(elements)
        .filter((inputTag) => inputTag.checked)
        .map((inputTag) => ({
          instrument_type: inputTag.name,
        } as InstrumentType))
    );
  }

  return (
    <div id="instrument-type-filter">
      <legend>Type:</legend>
      {instrumentTypes.map((instrumentType) => (
        <div key={instrumentType.instrument_type}>
          <input
            type="checkbox"
            name={instrumentType.instrument_type}
            onChange={onChange}
            className="instrument-type-filter-checkbox"
            defaultChecked={true}
          />
          <label htmlFor={instrumentType.instrument_type}>{instrumentType.instrument_type}</label>
        </div>
      ))}
    </div>
  );
};
