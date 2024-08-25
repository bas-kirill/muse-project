import React from "react";
import styles from "./styles/Serp.widget.module.css";
import { InstrumentDetail, InstrumentId } from "generated/model";
import { InstrumentCard } from "shared/instrument-card";

interface Props {
  instruments: InstrumentDetail[];
  favoriteInstrumentIds: InstrumentId[];
}

export const SerpWidget = (props: Props) => {
  return (
    <div className={styles.serp}>
      {props.instruments.length === 0 && (
        <div className={styles.not_found}>Instruments not found :(</div>
      )}

      {props.instruments.length > 0 &&
        props.instruments.map((instrument) => (
          <InstrumentCard
            key={instrument.instrument_id.instrument_id}
            instrument={instrument}
            favorite={props.favoriteInstrumentIds
              .map((id) => id.instrument_id)
              .includes(instrument.instrument_id.instrument_id)}
          />
        ))}
    </div>
  );
};
