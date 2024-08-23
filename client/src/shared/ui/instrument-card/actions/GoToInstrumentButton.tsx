import { Link } from "react-router-dom";
import React from "react";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
}

export const GoToInstrumentButton = (props: Props) => {
  return (
    <button className="serp-go-to-instrument-details-button">
      <Link to={"/instrument/" + props.instrument.instrument_id.instrument_id}>
        Go
      </Link>
    </button>
  );
};
