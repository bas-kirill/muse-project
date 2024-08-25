import React from "react";
import styles from "./styles/EditInstrument.button.module.css";
import { useNavigate } from "react-router-dom";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
}

export const EditInstrumentButton = (props: Props) => {
  const navigate = useNavigate();

  return (
    <button
      className={styles.edit_instrument__button}
      /* eslint-disable */
      onClick={(_) => {
        const uri = `/instrument/${props.instrument.instrument_id.instrument_id}/edit`;
        navigate(uri);
      }}
    >
      Edit
    </button>
  );
};
