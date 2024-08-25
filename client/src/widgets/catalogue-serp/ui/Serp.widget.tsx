import React from "react";
import styles from "./styles/Serp.widget.module.scss";
import { InstrumentDetail } from "generated/model";
import { InstrumentCard } from "shared/instrument-card";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";

interface Props {
  instruments: InstrumentDetail[];
}

export const SerpWidget = (props: Props) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={styles.serp}>
      {props.instruments.length === 0 && (
        <div className={styles.not_found}>Instruments not found :(</div>
      )}

      {props.instruments.length > 0 &&
        props.instruments.map((instrument) => (
          <div
            className={`
            ${styles.serp__instrument_card_wrapper}
            ${darkMode ? styles.instrument_card__wrapper__dark : styles.instrument_card__wrapper__light}
          `}
          >
            <InstrumentCard
              key={instrument.instrument_id.instrument_id}
              instrument={instrument}
            />
          </div>
        ))}
    </div>
  );
};
