import React from "react";
import styles from "./styles/CreateInstrumentCard.button.module.css";
import { useNavigate } from "react-router-dom";
import { CREATE_INSTRUMENT } from "shared/config/paths";

export const CreateInstrumentCardButton = () => {
  const navigate = useNavigate();

  const handleOnAddInstrumentButtonClick = () => {
    navigate(CREATE_INSTRUMENT);
  };

  return (
    <button
      className={styles.instrument__add__button}
      onClick={handleOnAddInstrumentButtonClick}
    >
      Add new instrument
    </button>
  );
};
