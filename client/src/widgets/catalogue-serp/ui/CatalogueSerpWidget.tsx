import React from "react";
import "./CatalogueSerpWidget.css";
import { InstrumentCard } from "shared/ui/instrument-card/InstrumentCard";
import { InstrumentDetail, InstrumentId } from "generated/model";

interface Props {
  instruments: InstrumentDetail[];
  favoriteInstrumentIds: InstrumentId[];
}

export const CatalogueSerpWidget = (props: Props) => {
  return (
    <div id="catalogue-serp">
      {props.instruments.length === 0 && (
        <div id={"serp-widget-not-found"}>Instruments not found :(</div>
      )}

      {props.instruments.length > 0 &&
        props.instruments.map((instrument) => (
          <InstrumentCard
            key={instrument.instrument_id.instrument_id}
            instrument={instrument}
            favorite={
              props.favoriteInstrumentIds
                .map(id => id.instrument_id)
                .includes(instrument.instrument_id.instrument_id)
            }
          />
        ))}
    </div>
  );
};
