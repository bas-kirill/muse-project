import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteInstrument } from "shared/api/delete-instrument";
import Jwt from "domain/model/jwt";
import { LOGIN } from "shared/config/paths";
import { Modal } from "widgets/modal";
import { InstrumentId } from "domain/model/instrument-id";

interface Props {
  id: InstrumentId;
}

export const InstrumentActions = ({id}: Props) => {
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOnDeleteInstrument = () => {
    deleteInstrument(id)
      .then(() => {
        setSuccessModal(true);
      })
      .catch((r) => {
        const status = r.toJSON()["status"];
        if (status === 401) {
          Jwt.eraseFromLocalStorage();
          navigate(LOGIN);
        }
        setErrorModal(true);
      });
  };

  return (
    <>
      <button id="delete-instrument" onClick={handleOnDeleteInstrument}>
        Delete
      </button>

      <Modal opened={successModal} closeModal={() => setSuccessModal(false)}>
        <h1>Instrument Deleted</h1>
      </Modal>

      <Modal opened={errorModal} closeModal={() => setErrorModal(false)}>
        <h1>Fail to delete instrument</h1>
      </Modal>
    </>
  )
}