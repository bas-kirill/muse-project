import React from "react";
import "./CatalogueSerpWidget.css";
import { InstrumentDetails } from "./InstrumentDetails";
import { InstrumentActions } from "./InstrumentActions";
import { Instruments } from "domain/model/instrument";

interface Props {
  instruments: Instruments;
}

export const CatalogueSerpWidget = ({ instruments }: Props) => {
  console.log("instruments type:", typeof instruments);
  console.log("instruments value:", instruments);

  return (
    <div id="catalogue-serp">
      {instruments.map(instrument => (
        <div key={instrument.id.toString()} className="instrument-card">
          <InstrumentDetails instrument={instrument} />
          <InstrumentActions instrument={instrument} />
        </div>
      ))}
    </div>
  );
};
