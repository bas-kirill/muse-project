import React, { useRef, useState } from "react";
import { Instrument } from "domain/model/instrument";
import Jwt from "domain/model/jwt";
import { Modal } from "widgets/modal";
import "./InstrumentActions.css";
import { Role } from "domain/model/role";
import { RemoveInstrumentButton } from "./RemoveInstrumentButton";
import { GoToInstrumentButton } from "./GoToInstrumentButton";
import { EditInstrumentButton } from "./EditInstrumentButton";
import { AddToFavoriteButton } from "./AddToFavoriteButton";
import { Cookies } from "typescript-cookie";

interface Props {
  instrument: Instrument;
  favorite: boolean;
}

export const InstrumentActions = ({ instrument, favorite }: Props) => {
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const jwt = useRef<string | undefined>(Cookies.get("jwt") as string | undefined)

  return (
      <div className="serp-instrument-actions">
        {jwt.current !== undefined && Jwt.from(jwt.current).toRole() === Role.Editor && (
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
