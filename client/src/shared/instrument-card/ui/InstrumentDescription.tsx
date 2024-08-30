import React from "react";
import styles from "./styles/InstrumentDescription.module.css";
import { InstrumentDetail } from "generated/model";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";
import { useTranslation } from "react-i18next";
import {
  I18N_COUNTRY, I18N_INSTRUMENT_BASIC_MATERIALS,
  I18N_INSTRUMENT_CARD_MANUFACTURER,
  I18N_INSTRUMENT_TYPE_FILTER,
  I18N_MANUFACTURER_DATE,
  I18N_RELEASE_DATE
} from "../../../i18n";

interface Props {
  instrument: InstrumentDetail;
}

export const InstrumentDescription = (props: Props) => {
  const {t } = useTranslation();
  const { darkMode } = useDarkMode();

  const {
    instrument_name: { instrument_name },
    instrument_type: { code, localized_text },
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
          {t(I18N_INSTRUMENT_TYPE_FILTER)}
        </b>
        :{" "}
        <span className={`${darkMode ? styles.primary__dark : styles.primary}`}>
          {localized_text}
        </span>
        <br />
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          {t(I18N_INSTRUMENT_CARD_MANUFACTURER)}
        </b>
        :{" "}
        <span className={`${darkMode ? styles.primary__dark : styles.primary}`}>
          {manufacturer_name}
        </span>
        <br />
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          {t(I18N_MANUFACTURER_DATE)}
        </b>
        :{" "}
        <span className={`${darkMode ? styles.primary__dark : styles.primary}`}>
          {manufacture_date}
        </span>
        <br />
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          {t(I18N_RELEASE_DATE)}
        </b>
        :{" "}
        <span className={`${darkMode ? styles.primary__dark : styles.primary}`}>
          {release_date}
        </span>
        <br />
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          {t(I18N_COUNTRY)}
        </b>
        :{" "}
        <span className={`${darkMode ? styles.primary__dark : styles.primary}`}>
          {country}
        </span>
        <br />
        <b
          className={`${darkMode ? styles.secondary__dark : styles.secondary}`}
        >
          {t(I18N_INSTRUMENT_BASIC_MATERIALS)}
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
