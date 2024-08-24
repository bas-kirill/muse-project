import React from "react";
import styles from "./styles/GoToInstrument.button.module.css";
import { Link } from "react-router-dom";

import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
}

export const GoToInstrumentButton = (props: Props) => {
  return (
    <button className={styles.go_to_instrument__button}>
      <Link to={"/instrument/" + props.instrument.instrument_id.instrument_id}>
        Go
      </Link>
    </button>
  );
};
