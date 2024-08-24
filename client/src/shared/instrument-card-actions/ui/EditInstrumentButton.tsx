import React from "react";
import styles from "./styles/EditInstrumentButton.module.css";
import { Link } from "react-router-dom";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
}

export const EditInstrumentButton = (props: Props) => {
  return (
    <button className={styles.edit_instrument__button}>
      <Link
        to={
          "/instrument/" +
          props.instrument.instrument_id.instrument_id +
          "/edit"
        }
      >
        Edit
      </Link>
    </button>
  );
};
