import React from "react";
import "./CatalogueSerpWidget.css";
import { Instruments } from "domain/model/instrument";
import { InstrumentCard } from "shared/ui/instrument-card/InstrumentCard";

interface Props {
  instruments: Instruments;
  favoriteInstrumentIds: number[];
}

export const CatalogueSerpWidget = ({
  instruments,
  favoriteInstrumentIds,
}: Props) => {
  return (
    <div id="catalogue-serp">
      {instruments.map((instrument) => (
        <InstrumentCard key={instrument.id.toString()}
          instrument={instrument}
          favorite={favoriteInstrumentIds.includes(instrument.id)}
        />
      ))}
    </div>
  );
};
