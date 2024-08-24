import React from "react";
import "./styles/Instrument.page.css";
import { FooterWidget } from "widgets/footer";
import { HeaderWidget } from "widgets/header";
import { useLoaderData } from "react-router-dom";
import { InstrumentDetail } from "generated/model";
import { InstrumentCard } from "shared/instrument-card";

export function InstrumentPage() {
  const instrument = useLoaderData() as InstrumentDetail;

  return (
    <>
      <HeaderWidget />
      <InstrumentCard instrument={instrument} favorite={false} />
      <FooterWidget />
    </>
  );
}
