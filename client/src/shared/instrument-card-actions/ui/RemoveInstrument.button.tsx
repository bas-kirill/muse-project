import React from "react";
import styles from "./styles/RemoveInstrument.button.module.css";
import actionBtnStyle from "./styles/Action.button.module.css";
import { InstrumentDetail } from "generated/model";
import { RemoveFavoriteApi } from "generated/api/remove-favorite-api";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";

interface Props {
  instrument: InstrumentDetail;
  setSuccessModal: (successModal: boolean) => void;
  setErrorModal: (errorModal: boolean) => void;
}

const removeFavoriteApi = new RemoveFavoriteApi();

export const RemoveInstrumentButton = (props: Props) => {
  const {darkMode} = useDarkMode();

  const handleOnDeleteInstrument = () => {
    const removeFavorite = async () => {
      const response = await removeFavoriteApi.removeFavorite(
        props.instrument.instrument_id,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        props.setSuccessModal(true);
        return;
      }

      props.setErrorModal(true);
    };

    removeFavorite();
  };

  return (
    <button
      onClick={handleOnDeleteInstrument}
      className={`
        ${actionBtnStyle.action__button}
        ${styles.btn}
        ${darkMode && styles.btn__dark}
      `}
    >
      Remove
    </button>
  );
};
