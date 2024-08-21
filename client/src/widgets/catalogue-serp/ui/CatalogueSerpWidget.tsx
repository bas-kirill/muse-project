import React from "react";
import "./CatalogueSerpWidget.css";
import { InstrumentCard } from "shared/ui/instrument-card/InstrumentCard";
import { InstrumentDetail } from "@generated/model";

interface Props {
  instruments: InstrumentDetail[];
  favoriteInstrumentIds: number[];
}

export const CatalogueSerpWidget = (props: Props) => {
  return (
    <div id="catalogue-serp">
      {props.instruments.length == 0 && (
        <div id={"serp-widget-not-found"}>Instruments not found :(</div>
      )}

      {props.instruments.length > 0 &&
        props.instruments.map((instrument) => (
          <InstrumentCard
            key={instrument.id?.toString()}
            instrument={instrument}
            favorite={props.favoriteInstrumentIds.includes(instrument.id)}
          />
        ))}
    </div>
  );
};
