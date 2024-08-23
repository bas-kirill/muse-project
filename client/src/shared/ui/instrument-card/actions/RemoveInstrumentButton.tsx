import React from "react";
import { InstrumentDetail } from "generated/model";
import { useJwt } from "pages/login";
import { RemoveFavoriteApi } from "generated/api/remove-favorite-api";

interface Props {
  instrument: InstrumentDetail;
  setSuccessModal: (successModal: boolean) => void;
}

const removeFavorite = new RemoveFavoriteApi();

export const RemoveInstrumentButton = (props: Props) => {
  useJwt();

  const handleOnDeleteInstrument = () => {
    removeFavorite
      .removeFavorite(props.instrument.instrument_id)
      .then(() => {
        props.setSuccessModal(true);
      })
      .catch(() => {
        throw new Error(`Fail to remove instrument ${props.instrument.instrument_id.instrument_id}`);
      });
  };

  return (
    <button
      className="serp-remove-instrument-button"
      onClick={handleOnDeleteInstrument}
    >
      Remove
    </button>
  );
};
