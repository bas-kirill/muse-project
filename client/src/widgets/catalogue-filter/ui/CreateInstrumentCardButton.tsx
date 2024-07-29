import React from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_INSTRUMENT } from "shared/config/paths";

export const CreateInstrumentCardButton = () => {
  const navigate = useNavigate();

  const handleOnAddInstrumentButtonClick = () => {
    navigate(CREATE_INSTRUMENT);
  }

  return (
    <button id="add-instrument-card" onClick={handleOnAddInstrumentButtonClick}>
      Add new instrument
    </button>
  );
};
