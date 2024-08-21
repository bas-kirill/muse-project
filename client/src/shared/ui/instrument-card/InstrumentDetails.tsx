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
        <h2>{props.instrument.name}</h2>
        <b>Type</b>: {props.instrument.type}
        <br />
        <b>Manufacturer</b>: {props.instrument.manufacturer}
        <br />
        <b>Manufacturer Date</b>: {props.instrument.manufacturerDate}
        <br />
        <b>Release Date</b>: {props.instrument.releaseDate}
        <br />
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
