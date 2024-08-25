import React from "react";
import styles from "./styles/ShowInstrument.button.module.css";
import { useNavigate } from "react-router-dom";

import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
}

export const GoToInstrumentButton = (props: Props) => {
  const navigate = useNavigate();

  return (
    <button
      className={styles.go_to_instrument__button}
      /* eslint-disable */
      onClick={(_) => {
        const uri = `/instrument/${props.instrument.instrument_id.instrument_id}`;
        navigate(uri);
      }}
    >
      Show
    </button>
  );
};
