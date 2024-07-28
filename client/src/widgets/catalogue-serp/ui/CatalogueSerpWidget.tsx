import React from "react";
import "./CatalogueSerpWidget.css";
import guitarImg from "./electric-guitar-gray.jpg";
import { Link } from "react-router-dom";
import { Instruments } from "pages/catalogue";

interface Props {
  instruments: Instruments;
}

export const CatalogueSerpWidget: React.FC<Props> = ({ instruments }) => {
  return (
    <div id="catalogue-serp">
      {instruments.map((instrument) => (
        <div key={instrument.id.toString()} className="instrument-card">
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
              <b>Основные материалы</b>: {instrument.basicMaterials}
              <br />
            </div>
          </div>
          <div className="instrument-actions">
            <div className="go-to-instrument-details-button">
              <Link to={"/instrument/" + instrument.id.toString()}>Go</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
