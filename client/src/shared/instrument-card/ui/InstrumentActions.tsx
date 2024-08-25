import React, { useRef, useState } from "react";
import Jwt from "domain/model/jwt";
import { ModalWidget } from "widgets/modal";
import styles from "./styles/InstrumentActions.module.css";
import { Role } from "domain/model/role";
import { Cookies } from "typescript-cookie";
import { InstrumentDetail } from "generated/model";
import {
  FavoriteButton,
  EditInstrumentButton,
  GoToInstrumentButton,
  RemoveInstrumentButton,
} from "shared/instrument-card-actions";

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
    <div className={styles.instrument_actions__wrapper}>
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

      <FavoriteButton
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

      {/*<ModalWidget*/}
      {/*  opened={deleteSuccessModal}*/}
      {/*  closeModal={() => setDeleteSuccessModal(false)}*/}
      {/*>*/}
      {/*  <h1>✅Instrument deleted</h1>*/}
      {/*</ModalWidget>*/}

      {/*<ModalWidget*/}
      {/*  opened={deleteErrorModal}*/}
      {/*  closeModal={() => setDeleteErrorModal(false)}*/}
      {/*>*/}
      {/*  <h1>❌Fail to delete instrument</h1>*/}
      {/*</ModalWidget>*/}
    </div>
  );
};
