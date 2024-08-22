import React, { useRef, useState } from "react";
import Jwt from "domain/model/jwt";
import { Modal } from "widgets/modal";
import "./InstrumentActions.css";
import { Role } from "domain/model/role";
import { RemoveInstrumentButton } from "./RemoveInstrumentButton";
import { GoToInstrumentButton } from "./GoToInstrumentButton";
import { EditInstrumentButton } from "./EditInstrumentButton";
import { AddFavoriteButton } from "./AddFavoriteButton";
import { Cookies } from "typescript-cookie";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
  favorite: boolean;
}

export const InstrumentActions = (props: Props) => {
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const jwt = useRef<string | undefined>(
    Cookies.get("jwt") as string | undefined,
  );

  return (
    <div className="serp-instrument-actions">
      {jwt.current !== undefined &&
        Jwt.from(jwt.current).toRole() === Role.Editor && (
          <>
            <RemoveInstrumentButton
              instrument={props.instrument}
              setSuccessModal={setSuccessModal}
            />
            <EditInstrumentButton instrument={props.instrument} />
          </>
        )}

      <AddFavoriteButton
        instrumentId={props.instrument.id}
        favorite={props.favorite}
      />
      <GoToInstrumentButton instrument={props.instrument} />

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
