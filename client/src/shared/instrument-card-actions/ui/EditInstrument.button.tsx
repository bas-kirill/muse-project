import React from "react";
import styles from "./styles/EditInstrument.button.module.css";
import actionBtnStyle from "./styles/Action.button.module.css";
import { useNavigate } from "react-router-dom";
import { InstrumentDetail } from "generated/model";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";

interface Props {
  instrument: InstrumentDetail;
}

export const EditInstrumentButton = (props: Props) => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <button
      className={`
        ${actionBtnStyle.action__button}
        ${darkMode ? styles.btn__dark : styles.btn__light}
      `}
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
