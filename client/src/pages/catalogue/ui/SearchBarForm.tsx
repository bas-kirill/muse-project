import React from "react";
import { InstrumentName } from "generated/model";
import { Filters } from "widgets/catalogue-filter";

interface Props {
  filters: Filters;
  setFilters: (filter: Filters) => void;
}

export const SearchBarForm = (props: Props) => {
  return (
    <div id="catalogue-search-bar-form">
      <input
        type="text"
        placeholder={"Search..."}
        onChange={(e) => {
          props.setFilters({
            ...props.filters,
            instrumentName: {
              instrument_name: e.target.value,
            } as InstrumentName,
          });
        }}
      />
    </div>
  );
};
