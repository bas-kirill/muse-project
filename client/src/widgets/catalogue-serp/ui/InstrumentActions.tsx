import React, { useState } from "react";
import { Instrument } from "domain/model/instrument";
import Jwt from "domain/model/jwt";
import { Modal } from "widgets/modal";
import "./InstrumentActions.css";
import { Role } from "domain/model/role";
import { RemoveInstrumentButton } from "./actions/RemoveInstrumentButton";
import { GoToInstrumentButton } from "./actions/GoToInstrumentButton";
import { EditInstrumentButton } from "./actions/EditInstrumentButton";

interface Props {
  instrument: Instrument;
}

export const InstrumentActions = ({ instrument }: Props) => {
  const [successModal, setSuccessModal] = useState<boolean>(false);

  return (
    <div className="serp-instrument-actions">
      {Jwt.extractFromLocalStorage()?.toRole() === Role.Editor && (
        <>
          <RemoveInstrumentButton instrument={instrument} setSuccessModal={setSuccessModal} />
          <EditInstrumentButton instrument={instrument} />
        </>
      )}

      <GoToInstrumentButton instrument={instrument}/>

      <Modal
        opened={successModal}
        closeModal={() => {
          setSuccessModal(false);
          window.location.reload();
        }}
      >
        <h1>✅Instrument deleted</h1>
      </Modal>
    </div>
  );
};
