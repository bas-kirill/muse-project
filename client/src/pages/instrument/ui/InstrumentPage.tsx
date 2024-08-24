import React from "react";
import "./styles/InstrumentPage.css";
import { FooterWidget } from "widgets/footer";
import { HeaderWidget } from "widgets/header";
import { useLoaderData } from "react-router-dom";
import { InstrumentActions } from "./InstrumentActions";
import { InstrumentDescription } from "./InstrumentDescription";
import { InstrumentDetail } from "generated/model";

export function InstrumentPage() {
  const instrument = useLoaderData() as InstrumentDetail;

  return (
    <>
      <HeaderWidget />
      <div id="instrument">
        <InstrumentDescription instrument={instrument} />
        <InstrumentActions instrument={instrument} />
      </div>
      <FooterWidget />
    </>
  );
}
