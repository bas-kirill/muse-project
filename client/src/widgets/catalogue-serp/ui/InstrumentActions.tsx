import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Instrument } from "domain/model/instrument";
import { deleteInstrument } from "shared";
import { InstrumentId } from "domain/model/instrument-id";
import Jwt from "domain/model/jwt";
import { Modal } from "widgets/modal";
import "./InstrumentActions.css";

interface Props {
  instrument: Instrument;
}

export const InstrumentActions = ({ instrument }: Props) => {
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOnDeleteInstrument = () => {
    const instrumentId = InstrumentId.from(instrument.id);
    deleteInstrument(instrumentId)
      .then(() => {
        setSuccessModal(true);
      })
      .catch((r) => {
        const status = r.toJSON()["status"];
        if (status === 401) {
          Jwt.eraseFromLocalStorage();
          navigate("/login");
        }
      });
  };

  return (
    <div className="instrument-actions">
      <button
        className="remove-instrument-button"
        onClick={handleOnDeleteInstrument}
      >
        Remove
      </button>
      <button className="go-to-instrument-details-button">
        <Link to={"/instrument/" + instrument.id.toString()}>Go</Link>
      </button>

      <Modal
        opened={successModal}
        closeModal={() => {
          setSuccessModal(false);
          window.location.reload();
        }}
      >
        <h1>✅ Instrument deleted</h1>
      </Modal>
    </div>
  );
};
