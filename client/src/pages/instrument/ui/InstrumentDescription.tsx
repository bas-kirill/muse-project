import React from "react";
import "./InstrumentDescription.css";
import electricGuitar from "pages/instrument/ui/electric-guitar-gray.jpg";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
}

export const InstrumentDescription = (props: Props) => {
  return (
    <div id="instrument-description">
      <img
        src={electricGuitar}
        width="200"
        height="200"
        alt="Electric Guitar"
      />
      <div>
        <h1>{props.instrument.name}</h1>
        <b>Type</b>: {props.instrument.type}
        <br />
        <b>Manufacturer</b>: {props.instrument.manufacturer} <br />
        <b>Manufacturer Date</b>: {props.instrument.manufacturerDate} <br />
        <b>Release Date</b>: {props.instrument.releaseDate} <br />
        <b>Country</b>: {props.instrument.country}
        <br />
        <b>Basic Materials</b>:
        <ul>
          {props.instrument.basicMaterials.map((basicMaterial) => (
            <li key={basicMaterial}>{basicMaterial}</li>
          ))}
        </ul>
        <br />
      </div>
    </div>
  );
};
