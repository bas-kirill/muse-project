import React from "react";
import styles from "./styles/ShowInstrument.button.module.css";
import actionBtnStyle from "./styles/Action.button.module.css";
import { useNavigate } from "react-router-dom";

import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
}

export const ShowInstrumentButton = (props: Props) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    const uri = `/instrument/${props.instrument.instrument_id.instrument_id}`;
    return navigate(uri);
  };

  return (
    <button className={`
      ${actionBtnStyle.action__button}
      ${styles.show_instrument__button}
    `} onClick={handleOnClick}>
      Show
    </button>
  );
};
