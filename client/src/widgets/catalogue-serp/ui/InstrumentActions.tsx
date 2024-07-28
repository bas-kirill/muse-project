import { Link } from "react-router-dom";
import React from "react";
import { Instrument } from "@domain/model/instrument";

interface Props {
  instrument: Instrument;
}

export const InstrumentActions = ({ instrument }: Props) => {
  return (
    <div className="instrument-actions">
      <div className="go-to-instrument-details-button">
        <Link to={"/instrument/" + instrument.id.toString()}>Go</Link>
      </div>
    </div>
  );
};
