import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Instrument } from "domain/model/instrument";
import { deleteInstrument } from "shared";
import { InstrumentId } from "domain/model/instrument-id";
import Jwt from "domain/model/jwt";
import { Modal } from "widgets/modal";
import "./InstrumentActions.css";
import { LOGIN } from "shared/config/paths";
import { Role } from "domain/model/role";

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
          navigate(LOGIN);
        }
      });
  };

  return (
    <div className="instrument-actions">
      {Jwt.extractFromLocalStorage()?.toRole() === Role.Editor && (
        <>
          <button
            className="remove-instrument-button"
            onClick={handleOnDeleteInstrument}
          >
            Remove
          </button>
          <button className="edit-instrument-button">
            <Link to={"/instrument/" + instrument.id.toString() + "/edit"}>
              Edit
            </Link>
          </button>
        </>
      )}

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
