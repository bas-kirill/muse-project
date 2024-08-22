import React, { useState } from "react";
import "./InstrumentActions.css";
import { useNavigate } from "react-router-dom";
import Jwt from "domain/model/jwt";
import { LOGIN } from "shared/config/paths";
import { Modal } from "widgets/modal";
import { InstrumentDetail } from "generated/model";
import { DeleteInstrumentByIdApi } from "generated/api/delete-instrument-by-id-api";

interface Props {
  instrument: InstrumentDetail;
}

const deleteInstrumentById = new DeleteInstrumentByIdApi();

export const InstrumentActions = (props: Props) => {
  const [deleteSuccessModal, setDeleteSuccessModal] = useState<boolean>(false);
  const [deleteErrorModal, setDeleteErrorModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOnDeleteInstrument = () => {
    deleteInstrumentById
      .deleteInstrumentById(props.instrument.id)
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
    navigate("/instrument/" + props.instrument.id + "/edit");
  };

  return (
    <div id="instrument-profile-instrument-actions">
      {Jwt.extractFromLocalStorage()?.toRole() === "EDITOR" && (
        <>
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
        </>
      )}
    </div>
  );
};
