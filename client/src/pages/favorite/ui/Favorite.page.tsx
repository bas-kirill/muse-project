import React from "react";
import { FavoriteLoader } from "pages/favorite";
import { HeaderWidget } from "widgets/header";
import { useLoaderData } from "react-router-dom";

import { FooterWidget } from "widgets/footer";
import { InstrumentCard } from "shared/instrument-card";

export const FavoritePage = () => {
  const loader = useLoaderData() as FavoriteLoader;

  return (
    <>
      <HeaderWidget />

      <h1>Favorite</h1>

      {loader.instrumentDetails.length === 0 && (
        <div style={{ textAlign: "center" }}>Favorite List is Empty</div>
      )}

      {loader.instrumentDetails.map((instrument) => (
        <InstrumentCard
          key={instrument.instrument_id.instrument_id}
          instrument={instrument}
          favorite={true}
        />
      ))}

      <FooterWidget />
    </>
  );
};
