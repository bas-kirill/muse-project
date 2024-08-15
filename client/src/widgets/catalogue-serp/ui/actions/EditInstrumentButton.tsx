import { Link } from "react-router-dom";
import React from "react";
import { Instrument } from "domain/model/instrument";

interface Props {
  instrument: Instrument;
}

export const EditInstrumentButton = (props: Props) => {
  return (
    <button className="serp-edit-instrument-button">
      <Link to={"/instrument/" + props.instrument.id.toString() + "/edit"}>
        Edit
      </Link>
    </button>
  );
};
