import React, { useRef, useState } from "react";
import Jwt from "domain/model/jwt";
import { ModalWidget } from "widgets/modal";
import styles from "./styles/InstrumentActions.module.css";
import { Role } from "domain/model/role";
import { InstrumentDetail } from "generated/model";
import {
  FavoriteButton,
  EditInstrumentButton,
  ShowInstrumentButton,
  RemoveInstrumentButton,
} from "shared/instrument-card-actions";
import { COOKIE_JWT_KEY } from "shared/config/frontend";
import { getCookie } from "shared/cookie/cookie";

interface Props {
  instrument: InstrumentDetail;
  removeButton: boolean;
  editButton: boolean;
  favoriteButton: boolean;
  showButton: boolean;
}

export const InstrumentActions = (props: Props) => {
  const jwt = useRef<string | undefined>(getCookie(COOKIE_JWT_KEY));

  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);

  return (
    <div className={styles.actions__wrapper}>
      {props.removeButton &&
        jwt.current !== undefined &&
        Jwt.from(jwt.current).toRole() === Role.Editor && (
          <RemoveInstrumentButton
            instrument={props.instrument}
            setErrorModal={setErrorModal}
            setSuccessModal={setSuccessModal}
          />
        )}

      {props.editButton &&
        jwt.current !== undefined &&
        Jwt.from(jwt.current).toRole() === Role.Editor && (
          <EditInstrumentButton instrument={props.instrument} />
        )}

      {props.favoriteButton && jwt.current !== undefined && (
        <FavoriteButton instrumentId={props.instrument.instrument_id} />
      )}

      {props.showButton && (
        <ShowInstrumentButton instrument={props.instrument} />
      )}

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
