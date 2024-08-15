import React from "react";
import { InstrumentId } from "domain/model/instrument-id";
import { deleteInstrument } from "shared/api/delete-instrument";
import Jwt from "domain/model/jwt";
import { LOGIN } from "shared/config/paths";
import { useNavigate } from "react-router-dom";
import { Instrument } from "domain/model/instrument";

interface Props {
  instrument: Instrument;
  setSuccessModal: (successModal: boolean) => void;
}

export const RemoveInstrumentButton = (props: Props) => {
  const navigate = useNavigate();

  const handleOnDeleteInstrument = () => {
    const instrumentId = InstrumentId.from(props.instrument.id);
    deleteInstrument(instrumentId)
      .then(() => {
        props.setSuccessModal(true);
      })
      .catch((r) => {
        const status = r.toJSON()["status"];
        if (status === 401) {
          Jwt.eraseFromLocalStorage();
          navigate(LOGIN);
        }
      });
  };

  return (
    <button
      className="serp-remove-instrument-button"
      onClick={handleOnDeleteInstrument}
    >
      Remove
    </button>
  );
}