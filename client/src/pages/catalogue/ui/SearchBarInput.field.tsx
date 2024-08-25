import React from "react";
import styles from "./styles/SearchBarInput.field.module.scss";
import { InstrumentName } from "generated/model";
import { Filters } from "widgets/catalogue-filter";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";

interface Props {
  filters: Filters;
  setFilters: (filter: Filters) => void;
}

export const SearchBarInputField = (props: Props) => {
  const { darkMode } = useDarkMode();

  return (
    <input
      type="text"
      placeholder={"Search by instrument name..."}
      onChange={(e) => {
        props.setFilters({
          ...props.filters,
          instrumentName: {
            instrument_name: e.target.value,
          } as InstrumentName,
        });
      }}
      className={`
        ${styles.search_bar__input}
        ${darkMode ? styles.dark : styles.light}
      `}
    />
  );
};
