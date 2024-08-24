import React from "react";
import styles from "./styles/InstrumentCard.module.css";
import { InstrumentDescription } from "shared/instrument-card";
import { InstrumentDetail } from "generated/model";
import { InstrumentActions } from "shared/instrument-card/ui/InstrumentActions";

interface Props {
  instrument: InstrumentDetail;
  favorite: boolean;
}

export const InstrumentCard = (props: Props) => {
  return (
    <div className={styles.instrument_card}>
      <InstrumentDescription instrument={props.instrument} />
      <InstrumentActions
        instrument={props.instrument}
        favorite={props.favorite}
      />
    </div>
  );
};
