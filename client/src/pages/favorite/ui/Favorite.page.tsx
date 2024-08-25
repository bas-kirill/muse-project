import React from "react";
import styles from "./styles/Favorite.page.module.css";
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

      <h1 className={styles.h1}>Favorite</h1>

      {loader.instrumentDetails.length === 0 && (
        <div className={styles.favorite__empty}>Favorite List is Empty</div>
      )}

      <div className={styles.instruments__wrapper}>
        {loader.instrumentDetails.map((instrument) => (
          <div className={styles.instrument__wrapper}>
            <InstrumentCard
              key={instrument.instrument_id.instrument_id}
              instrument={instrument}
              favorite={true}
            />
          </div>
        ))}
      </div>

      <FooterWidget />
    </>
  );
};
