import React from "react";
import styles from "./styles/InstrumentDescription.module.css";
import { InstrumentDetail } from "generated/model";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";

interface Props {
  instrument: InstrumentDetail;
}

export const InstrumentDescription = (props: Props) => {
  const { darkMode } = useDarkMode();

  const {
    instrument_name: { instrument_name },
    instrument_type: { instrument_type },
    manufacturer_name: { manufacturer_name },
    manufacturer_date: { manufacture_date },
    release_date: { release_date },
    country: { country },
    basic_materials,
  } = props.instrument;

  return (
    <div className={styles.wrapper}>
      <div className={styles.instrument__description}>
        <h1 className={`${darkMode ? styles.h1__dark : styles.h1}`}>
          {instrument_name}
        </h1>
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          Type
        </b>
        :{" "}
        <span className={`${darkMode ? styles.primary__dark : styles.primary}`}>
          {instrument_type}
        </span>
        <br />
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          Manufacturer
        </b>
        :{" "}
        <span className={`${darkMode ? styles.primary__dark : styles.primary}`}>
          {manufacturer_name}
        </span>
        <br />
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          Manufacturer date
        </b>
        :{" "}
        <span className={`${darkMode ? styles.primary__dark : styles.primary}`}>
          {manufacture_date}
        </span>
        <br />
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          Release Date
        </b>
        :{" "}
        <span className={`${darkMode ? styles.primary__dark : styles.primary}`}>
          {release_date}
        </span>
        <br />
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          Country
        </b>
        :{" "}
        <span className={`${darkMode ? styles.primary__dark : styles.primary}`}>
          {country}
        </span>
        <br />
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          Basic Materials
        </b>
        :
        <>
          {basic_materials.map((basic_material, index) => (
            <span
              className={`${darkMode ? styles.primary__dark : styles.primary}`}
            >
              {index > 0 ? "," : ""} {basic_material.basic_material}
            </span>
          ))}
        </>
      </div>
    </div>
  );
};
