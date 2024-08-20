import React from "react";
import "./CatalogueSerpWidget.css";
import { Instruments } from "domain/model/instrument";
import { InstrumentCard } from "shared/ui/instrument-card/InstrumentCard";

interface Props {
  instruments: Instruments;
  favoriteInstrumentIds: number[];
}

export const CatalogueSerpWidget = (props: Props) => {
  return (
    <div id="catalogue-serp">
      {props.instruments.length == 0 && (
        <div id={"serp-widget-not-found"}>Instruments not found :(</div>
      )}
      {/*{props.instruments.length > 0 && props.instruments.map((instrument) => (*/}
      {/*  <div key={instrument.id.toString()} className="instrument-card">*/}
      {/*    <InstrumentDetails instrument={instrument} />*/}
      {/*    <InstrumentActions*/}
      {/*      instrument={instrument}*/}
      {/*      favorite={props.favoriteInstrumentIds.includes(instrument.id)}*/}
      {/*    />*/}
      {/*  </div>*/}

      {props.instruments.length > 0 && props.instruments.map((instrument) => (
        <InstrumentCard
          key={instrument.id.toString()}
          instrument={instrument}
          favorite={props.favoriteInstrumentIds.includes(instrument.id)}
        />
      ))}


    </div>
  );
};
