import React from "react";
import { Instrument } from "@domain/model/instrument";
import guitarImg from "./electric-guitar-gray.jpg";

interface Props {
  instrument: Instrument;
}

export const InstrumentDetails = ({ instrument }: Props) => {
  return (
    <div className="instrument-details">
      <img src={guitarImg} width={100} height={200} alt={"Guitar Gray"} />
      <div className="instrument-details-description">
        <h2>{instrument.name}</h2>
        <b>Тип</b>: {instrument.type}
        <br />
        <b>Производитель</b>: {instrument.manufacturer}
        <br />
        <b>Дата изготовления</b>: {instrument.manufacturerDate}
        <br />
        <b>Дата выпуска</b>: {instrument.releaseDate}
        <br />
        <b>Страна</b>: {instrument.country}
        <br />
        <b>Основные материалы</b>:
        <ul>
          {instrument.basicMaterials.map((basicMaterial) => (
            <li key={basicMaterial}>{basicMaterial}</li>
          ))}
        </ul>
        <br />
      </div>
    </div>
  );
};
