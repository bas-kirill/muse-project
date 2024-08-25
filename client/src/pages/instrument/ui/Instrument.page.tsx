import React from "react";
import styles from "./styles/Instrument.page.module.css";
import { FooterWidget } from "widgets/footer";
import { HeaderWidget } from "widgets/header";
import { useLoaderData } from "react-router-dom";
import {
  InstrumentActions,
  InstrumentDescription,
  InstrumentPhoto,
} from "shared/instrument-card";
import { InstrumentLoader } from "pages/instrument";

export function InstrumentPage() {
  const loader = useLoaderData() as InstrumentLoader;

  return (
    <>
      <HeaderWidget />
      <div className={styles.instrument__wrapper}>
        <div className={styles.instrument__photo__description__wrapper}>
          <div className={styles.instrument__photo__wrapper}>
            <InstrumentPhoto instrument={loader.instrument} />
          </div>

          <div className={styles.instrument__description__wrapper}>
            <InstrumentDescription instrument={loader.instrument} />
          </div>
        </div>
        <div>
          <InstrumentActions
            instrument={loader.instrument}
            removeButton={true}
            favoriteButton={true}
            editButton={true}
            showButton={false}
          />
        </div>
      </div>
      <FooterWidget />
    </>
  );
}
