import React from "react";
import "./InstrumentDescription.css";
import electricGuitar from "pages/instrument/ui/electric-guitar-gray.jpg";
import { InstrumentDetails } from "pages/instrument";

interface Props {
  instrument: InstrumentDetails;
}

export const InstrumentDescription = ({instrument}: Props) => {
  return (
    <div id="instrument-description">
      <img
        src={electricGuitar}
        width="200"
        height="200"
        alt="Electric Guitar"
      />
      <div>
        <h1>{instrument.name}</h1>
        <b>Тип</b>: {instrument.type}
        <br />
        <b>Производитель</b>: {instrument.manufacturer} <br />
        <b>Дата изготовления</b>: {instrument.manufacturerDate} <br />
        <b>Дата выпуска</b>: {instrument.releaseDate} <br />
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
  )
}