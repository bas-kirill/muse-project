import React from "react";
import "./styles/InstrumentDescription.css";
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
        <h1>{props.instrument.manufacturer_name.manufacturer_name}</h1>
        <b>Type</b>: {props.instrument.instrument_type.instrument_type}
        <br />
        <b>Manufacturer</b>:{" "}
        {props.instrument.manufacturer_name.manufacturer_name} <br />
        <b>Manufacturer Date</b>:{" "}
        {props.instrument.manufacturer_date.manufacture_date} <br />
        <b>Release Date</b>: {props.instrument.release_date.release_date} <br />
        <b>Country</b>: {props.instrument.country.country}
        <br />
        <b>Basic Materials</b>:
        <ul>
          {props.instrument.basic_materials.map((basicMaterial) => (
            <li key={basicMaterial.basic_material}>
              {basicMaterial.basic_material}
            </li>
          ))}
        </ul>
        <br />
      </div>
    </div>
  );
};
