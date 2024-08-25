import React from "react";
import styles from "./styles/ShowInstrument.button.module.css";
import actionBtnStyle from "./styles/Action.button.module.css";
import { useNavigate } from "react-router-dom";

import { InstrumentDetail } from "generated/model";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";

interface Props {
  instrument: InstrumentDetail;
}

export const ShowInstrumentButton = (props: Props) => {
  const {darkMode} = useDarkMode();
  const navigate = useNavigate();

  const handleOnClick = () => {
    const uri = `/instrument/${props.instrument.instrument_id.instrument_id}`;
    return navigate(uri);
  };

  return (
    <button
      className={`
      ${actionBtnStyle.action__button}
      ${darkMode ? styles.btn__dark : styles.btn__light}
    `}
      onClick={handleOnClick}
    >
      Show
    </button>
  );
};
