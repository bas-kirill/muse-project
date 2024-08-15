import React from "react";

interface Props {
  setInstrumentName: (name: string) => void;
}

export const SearchBarForm = (props: Props) => {
  return (
    <div id="catalogue-search-bar-form">
      <input
        type="text"
        placeholder={"Search..."}
        onChange={(e) => {
          props.setInstrumentName(e.target.value);
        }}
      />
    </div>
  );
};
