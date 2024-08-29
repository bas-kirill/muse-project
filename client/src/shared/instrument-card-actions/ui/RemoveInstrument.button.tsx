import React from "react";
import styles from "./styles/RemoveInstrument.button.module.css";
import actionBtnStyle from "./styles/Action.button.module.css";
import { InstrumentDetail } from "generated/model";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";
import { apiConfig } from "shared/config/api";
import Jwt from "domain/model/jwt";
import { DeleteInstrumentByIdApi } from "generated/api/delete-instrument-by-id-api";

interface Props {
  instrument: InstrumentDetail;
  setSuccessModal: (successModal: boolean) => void;
  setErrorModal: (errorModal: boolean) => void;
}

const deleteInstrumentById = new DeleteInstrumentByIdApi(apiConfig)

export const RemoveInstrumentButton = (props: Props) => {
  const { darkMode } = useDarkMode();

  const handleOnDeleteInstrument = () => {
    const removeFavorite = async () => {
      const response = await deleteInstrumentById.deleteInstrumentById(
        props.instrument.instrument_id.instrument_id,
        {
          headers: {
            Authorization: `Bearer ${Jwt.extractFromCookie()!.toStringValue()}`,
          },
        },
      )
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
