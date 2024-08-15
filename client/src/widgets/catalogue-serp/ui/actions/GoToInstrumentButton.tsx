import { Link } from "react-router-dom";
import React from "react";
import { Instrument } from "domain/model/instrument";

interface Props {
  instrument: Instrument;
}

export const GoToInstrumentButton = (props: Props) => {
  return (
    <button className="serp-go-to-instrument-details-button">
      <Link to={"/instrument/" + props.instrument.id.toString()}>Go</Link>
    </button>
  );
}
