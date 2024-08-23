import React from "react";
import guitarImg from "./electric-guitar-gray.jpg";
import "./InstrumentDetails.css";
import { InstrumentDetail } from "generated/model";

interface Props {
  instrument: InstrumentDetail;
}

export const InstrumentDetails = (props: Props) => {
  return (
    <div className="instrument-details">
      <img src={guitarImg} width={100} height={200} alt={"Guitar Gray"} />
      <div className="instrument-details-description">
        <h2>{props.instrument.manufacturer_name.manufacturer_name}</h2>
        <b>Type</b>: {props.instrument.instrument_type.instrument_type}
        <br />
        <b>Manufacturer</b>: {props.instrument.manufacturer_name.manufacturer_name}
        <br />
        <b>Manufacturer Date</b>: {props.instrument.manufacturer_date.manufacture_date}
        <br />
        <b>Release Date</b>: {props.instrument.release_date.release_date}
        <br />
        <b>Country</b>: {props.instrument.country.country}
        <br />
        <b>Basic Materials</b>:
        <ul>
          {props.instrument.basic_materials.map((basicMaterial) => (
            <li key={basicMaterial.basic_material}>{basicMaterial.basic_material}</li>
          ))}
        </ul>
        <br />
      </div>
    </div>
  );
};
