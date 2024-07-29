import React, { useState } from "react";
import "./Instrument.css";
import { Footer } from "widgets/footer";
import { Header } from "widgets/header";
import electricGuitar from "./electric-guitar-gray.jpg";
import { useLoaderData, useNavigate } from "react-router-dom";
import { InstrumentId } from "domain/model/instrument-id";
import { InstrumentDetails } from "pages/instrument";
import { Modal } from "widgets/modal";
import Jwt from "domain/model/jwt";
import { deleteInstrument } from "shared";
import { LOGIN } from "@shared/config/paths";

export function Instrument() {
  const data = useLoaderData() as InstrumentDetails;
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOnDeleteInstrument = () => {
    const id = InstrumentId.from(data.id);
    deleteInstrument(id)
      .then(() => {
        setSuccessModal(true);
      })
      .catch((r) => {
        const status = r.toJSON()["status"];
        if (status === 401) {
          Jwt.eraseFromLocalStorage();
          navigate(LOGIN);
        }
        setErrorModal(true);
      });
  };

  return (
    <>
      <Header />
      <div id="instrument">
        <div id="instrument-details">
          <img
            src={electricGuitar}
            width="200"
            height="200"
            alt="Electric Guitar"
          />
          <div>
            <h1>{data.name}</h1>
            <b>Тип</b>: {data.type}
            <br />
            <b>Производитель</b>: {data.manufacturer} <br />
            <b>Дата изготовления</b>: {data.manufacturerDate} <br />
            <b>Дата выпуска</b>: {data.releaseDate} <br />
            <b>Страна</b>: {data.country}
            <br />
            <b>Основные материалы</b>:
            <ul>
              {data.basicMaterials.map((basicMaterial) => (
                <li key={basicMaterial}>{basicMaterial}</li>
              ))}
            </ul>
            <br />
          </div>
        </div>

        <button id="delete-instrument" onClick={handleOnDeleteInstrument}>
          Delete
        </button>

        <Modal opened={successModal} closeModal={() => setSuccessModal(false)}>
          <h1>Instrument Deleted</h1>
        </Modal>

        <Modal opened={errorModal} closeModal={() => setErrorModal(false)}>
          <h1>Fail to delete instrument</h1>
        </Modal>
      </div>
      <Footer />
    </>
  );
}
