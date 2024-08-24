import React, { useRef, useState } from "react";
import Jwt from "domain/model/jwt";
import { ModalWidget } from "widgets/modal";
import "./InstrumentActions.css";
import { Role } from "domain/model/role";
import { RemoveInstrumentButton } from "./RemoveInstrumentButton";
import { GoToInstrumentButton } from "./GoToInstrumentButton";
import { EditInstrumentButton } from "./EditInstrumentButton";
import { AddOrRemoveFavoriteButton } from "./AddOrRemoveFavoriteButton";
import { Cookies } from "typescript-cookie";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
  favorite: boolean;
}

export const InstrumentActions = (props: Props) => {
  const [errorModal, setErrorModal] = useState<boolean>(false);
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
              setErrorModal={setErrorModal}
              setSuccessModal={setSuccessModal}
            />
            <EditInstrumentButton instrument={props.instrument} />
          </>
        )}

      <AddOrRemoveFavoriteButton
        instrumentId={props.instrument.instrument_id}
        favorite={props.favorite}
      />
      <GoToInstrumentButton instrument={props.instrument} />

      <ModalWidget
        opened={errorModal}
        closeModal={() => {
          setErrorModal(false);
          window.location.reload();
        }}
      >
        <h1>❌Fail delete instrument</h1>
      </ModalWidget>

      <ModalWidget
        opened={successModal}
        closeModal={() => {
          setSuccessModal(false);
          window.location.reload();
        }}
      >
        <h1>✅Instrument deleted</h1>
      </ModalWidget>
    </div>
  );
};
