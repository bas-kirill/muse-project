import React from "react";
import { Link } from "react-router-dom";
import { InstrumentDetail } from "generated/model";
import { useJwt } from "pages/login";

interface Props {
  instrument: InstrumentDetail;
}

export const EditInstrumentButton = (props: Props) => {
  useJwt();

  return (
    <button className="serp-edit-instrument-button">
      <Link
        to={
          "/instrument/" +
          props.instrument.instrument_id.instrument_id +
          "/edit"
        }
      >
        Edit
      </Link>
    </button>
  );
};
