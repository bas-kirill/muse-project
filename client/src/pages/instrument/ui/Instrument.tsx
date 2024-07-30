import React from "react";
import "./Instrument.css";
import { Footer } from "widgets/footer";
import { Header } from "widgets/header";
import { useLoaderData } from "react-router-dom";
import { InstrumentActions } from "./InstrumentActions";
import { InstrumentDescription } from "./InstrumentDescription";
import { InstrumentDetails } from "pages/instrument";

export function Instrument() {
  const instrument = useLoaderData() as InstrumentDetails;

  return (
    <>
      <Header />
      <div id="instrument">
        <InstrumentDescription instrument={instrument} />
        <InstrumentActions instrument={instrument} />
      </div>
      <Footer />
    </>
  );
}
