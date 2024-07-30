import React from "react";
import "./CatalogueSerpWidget.css";
import { InstrumentDetails } from "./InstrumentDetails";
import { InstrumentActions } from "./InstrumentActions";
import { Instrument, Instruments } from "domain/model/instrument";

interface Props {
  instruments: Instruments;
}

export const CatalogueSerpWidget = ({ instruments }: Props) => {

  return (
    <div id="catalogue-serp">
      {instruments.map((instrument: Instrument) => (
        <div key={instrument.id.toString()} className="instrument-card">
          <InstrumentDetails instrument={instrument} />
          <InstrumentActions instrument={instrument} />
        </div>
      ))}
    </div>
  );
};
