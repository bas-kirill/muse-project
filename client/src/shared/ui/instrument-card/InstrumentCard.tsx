import React from "react";
import "./styles/InstrumentCard.css";
import { InstrumentDetails } from "./InstrumentDetails";
import { InstrumentActions } from "./actions/InstrumentActions";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
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
