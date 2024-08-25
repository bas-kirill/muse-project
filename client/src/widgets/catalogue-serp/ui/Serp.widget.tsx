import React from "react";
import styles from "./styles/Serp.widget.module.scss";
import { InstrumentDetail, InstrumentId } from "generated/model";
import { InstrumentCard } from "shared/instrument-card";

interface Props {
  instruments: InstrumentDetail[];
}

export const SerpWidget = (props: Props) => {
  return (
    <div className={styles.serp}>
      {props.instruments.length === 0 && (
        <div className={styles.not_found}>Instruments not found :(</div>
      )}

      {props.instruments.length > 0 &&
        props.instruments.map((instrument) => (
          <div className={styles.serp__instrument_card_wrapper}>
            <InstrumentCard
              key={instrument.instrument_id.instrument_id}
              instrument={instrument}
            />
          </div>
        ))}
    </div>
  );
};
