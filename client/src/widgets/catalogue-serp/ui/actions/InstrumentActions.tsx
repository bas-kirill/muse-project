import React, { useState } from "react";
import { Instrument } from "domain/model/instrument";
import Jwt from "domain/model/jwt";
import { Modal } from "widgets/modal";
import "./InstrumentActions.css";
import { Role } from "domain/model/role";
import { RemoveInstrumentButton } from "./RemoveInstrumentButton";
import { GoToInstrumentButton } from "./GoToInstrumentButton";
import { EditInstrumentButton } from "./EditInstrumentButton";
import { AddToFavoriteButton } from "./AddToFavoriteButton";

interface Props {
  instrument: Instrument;
  favorite: boolean;
}

export const InstrumentActions = ({ instrument, favorite }: Props) => {
  const [successModal, setSuccessModal] = useState<boolean>(false);

  return (
    <div className="serp-instrument-actions">
      {Jwt.extractFromLocalStorage()?.toRole() === Role.Editor && (
        <>
          <RemoveInstrumentButton
            instrument={instrument}
            setSuccessModal={setSuccessModal}
          />
          <EditInstrumentButton instrument={instrument} />
        </>
      )}

      <AddToFavoriteButton instrumentId={instrument.id} favorite={favorite} />
      <GoToInstrumentButton instrument={instrument} />

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
