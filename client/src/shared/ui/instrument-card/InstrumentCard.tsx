import { InstrumentDetails } from "./InstrumentDetails";
import { InstrumentActions } from "./actions/InstrumentActions";
import React from "react";
import { Instrument } from "domain/model/instrument";
import "./InstrumentCard.css";

interface Props {
  instrument: Instrument;
  favorite: boolean;
}

export const InstrumentCard = (props: Props) => {
  return (
    <div className="instrument-card">
      <InstrumentDetails instrument={props.instrument} />
      <InstrumentActions
        instrument={props.instrument}
        favorite={props.favorite}
      />
    </div>
  );
};
