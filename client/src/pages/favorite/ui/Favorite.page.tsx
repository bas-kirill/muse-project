import React from "react";
import styles from "./styles/Favorite.page.module.css";
import { HeaderWidget } from "widgets/header";

import { FooterWidget } from "widgets/footer";
import { InstrumentCard } from "shared/instrument-card";
import { useJwt } from "shared/jwt/use-jwt";
import { useLoaderData } from "react-router-dom";
import { FavoriteLoader } from "pages/favorite";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";

export const FavoritePage = () => {
  useJwt();
  const { darkMode } = useDarkMode();
  const loader = useLoaderData() as FavoriteLoader;

  return (
    <>
      <HeaderWidget />

      <h1 className={`${styles.h1} ${darkMode && styles.h1__dark}`}>
        Favorite
      </h1>

      {loader.instrumentDetails.length === 0 && (
        <div className={styles.favorite__empty}>Favorite List is Empty</div>
      )}

      <div className={styles.instruments__wrapper}>
        {loader.instrumentDetails.map((instrument) => (
          <div className={styles.instrument__wrapper}>
            <InstrumentCard
              key={instrument.instrument_id.instrument_id}
              instrument={instrument}
            />
          </div>
        ))}
      </div>

      <FooterWidget />
    </>
  );
};
