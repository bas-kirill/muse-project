import React from "react";
import styles from "./styles/ShowInstrument.button.module.css";
import actionBtnStyle from "./styles/Action.button.module.css";
import { useNavigate } from "react-router-dom";

import { InstrumentDetail } from "generated/model";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";
import { useTranslation } from "react-i18next";
import { I18N_INSTRUMENT_CARD_SHOW_BUTTON } from "../../../i18n";

interface Props {
  instrument: InstrumentDetail;
}

export const ShowInstrumentButton = (props: Props) => {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();
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
      {t(I18N_INSTRUMENT_CARD_SHOW_BUTTON)}
    </button>
  );
};
