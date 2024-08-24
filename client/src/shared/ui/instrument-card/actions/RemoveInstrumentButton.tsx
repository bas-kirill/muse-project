import React from "react";
import { InstrumentDetail } from "generated/model";
import { RemoveFavoriteApi } from "generated/api/remove-favorite-api";

interface Props {
  instrument: InstrumentDetail;
  setSuccessModal: (successModal: boolean) => void;
  setErrorModal: (errorModal: boolean) => void;
}

const removeFavoriteApi = new RemoveFavoriteApi();

export const RemoveInstrumentButton = (props: Props) => {

  const handleOnDeleteInstrument = () => {
    const removeFavorite = async () => {
      const response = await removeFavoriteApi.removeFavorite(
        props.instrument.instrument_id,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        props.setSuccessModal(true);
        return;
      }

      props.setErrorModal(true);
    };

    removeFavorite();
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
