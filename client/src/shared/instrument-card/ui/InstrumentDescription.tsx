import React, { useEffect, useState } from "react";
import styles from "./styles/InstrumentDescription.module.css";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
}

export const InstrumentDescription = (props: Props) => {
  const {
    instrument_type: { instrument_type },
    manufacturer_name: { manufacturer_name },
    manufacturer_date: { manufacture_date },
    release_date: { release_date },
    country: { country },
    basic_materials
  } = props.instrument;

  return (
    <div className={styles.wrapper}>
      <div className={styles.instrument__description}>
        <h1 className={styles.instrument_description__header}>
          {manufacturer_name}
        </h1>
        <b className={styles.secondary}>
          Type
        </b>: <span>{instrument_type}</span>
        <br />
        <b className={styles.secondary}>
          Manufacturer
        </b>: <span>{manufacturer_name}</span>
        <br />
        <b className={styles.secondary}>
          Manufacturer date
        </b>: <span>{manufacture_date}</span>
        <br />
        <b className={styles.secondary}>
          Release Date
        </b>: <span>{release_date}</span>
        <br />
        <b className={styles.secondary}>
          Country
        </b>: <span>{country}</span>
        <br />
        <b className={styles.secondary}>Basic Materials</b>:
        <>
          {basic_materials.map((basic_material, index) => (
            <span>{index > 0 ? "," : ""} {basic_material.basic_material}</span>
          ))}
        </>

      </div>
    </div>
  );
};
