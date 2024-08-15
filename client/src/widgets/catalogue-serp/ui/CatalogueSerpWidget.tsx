import React from "react";
import "./CatalogueSerpWidget.css";
import { InstrumentDetails } from "./InstrumentDetails";
import { InstrumentActions } from "./actions/InstrumentActions";
import { Instruments } from "domain/model/instrument";

interface Props {
  instruments: Instruments;
  favoriteInstrumentIds: number[];
}

export const CatalogueSerpWidget = ({ instruments, favoriteInstrumentIds }: Props) => {
  return (
    <div id="catalogue-serp">
      {instruments.map((instrument) => (
        <div key={instrument.id.toString()} className="instrument-card">
          <InstrumentDetails instrument={instrument} />
          <InstrumentActions
            instrument={instrument}
            favorite={favoriteInstrumentIds.includes(instrument.id)}
          />
        </div>
      ))}
    </div>
  );
};
