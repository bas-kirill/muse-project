import React, { useState } from "react";
import "./InstrumentActions.css";
import { useNavigate } from "react-router-dom";
import { deleteInstrument } from "shared/api/delete-instrument";
import Jwt from "domain/model/jwt";
import { LOGIN } from "shared/config/paths";
import { Modal } from "widgets/modal";
import { InstrumentDetails } from "pages/instrument";
import { InstrumentId } from "domain/model/instrument-id";

interface Props {
  instrument: InstrumentDetails;
}

export const InstrumentActions = ({ instrument }: Props) => {
  const [deleteSuccessModal, setDeleteSuccessModal] = useState<boolean>(false);
  const [deleteErrorModal, setDeleteErrorModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOnDeleteInstrument = () => {
    deleteInstrument(InstrumentId.from(instrument.id))
      .then(() => {
        setDeleteSuccessModal(true);
      })
      .catch((r) => {
        const status = r.toJSON()["status"];
        if (status === 401) {
          Jwt.eraseFromLocalStorage();
          navigate(LOGIN);
        }
        setDeleteErrorModal(true);
      });
  };

  const handleOnEditInstrument = () => {
    navigate("/instrument/" + instrument.id + "/edit");
  };

  return (
    <div id="instrument-profile-instrument-actions">
      <button
        id="instrument-profile-delete-instrument"
        onClick={handleOnDeleteInstrument}
      >
        Delete
      </button>

      <button
        id="instrument-profile-edit-instrument"
        onClick={handleOnEditInstrument}
      >
        Edit
      </button>

      <Modal
        opened={deleteSuccessModal}
        closeModal={() => setDeleteSuccessModal(false)}
      >
        <h1>✅Instrument deleted</h1>
      </Modal>

      <Modal
        opened={deleteErrorModal}
        closeModal={() => setDeleteErrorModal(false)}
      >
        <h1>❌Fail to delete instrument</h1>
      </Modal>
    </div>
  );
};
