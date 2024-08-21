import React from "react";
import { Link } from "react-router-dom";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
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
