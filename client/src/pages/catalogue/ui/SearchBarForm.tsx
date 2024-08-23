import React from "react";
import { InstrumentName } from "generated/model";

interface Props {
  setInstrumentName: (name: InstrumentName) => void;
}

export const SearchBarForm = (props: Props) => {
  return (
    <div id="catalogue-search-bar-form">
      <input
        type="text"
        placeholder={"Search..."}
        onChange={(e) => {
          props.setInstrumentName(({
            instrument_name: e.target.value,
          } as InstrumentName));
        }}
      />
    </div>
  );
};
