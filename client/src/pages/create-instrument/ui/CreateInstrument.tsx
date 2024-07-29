import React from "react";
import "./CreateInstrument.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";

export const CreateInstrument = () => {
  return (
    <>
      <Header />
      <h1>Instrument Creation</h1>
      <form id="create-instrument">
        <div className="create-instrument-field">
          <label htmlFor="instrument-name">Instrument Name</label>
          <input type="text" name="instrument-name" />
        </div>

        <div className="create-instrument-field">
          <label htmlFor="instrument-type">Instrument Type</label>
          <input type="text" name="instrument-type" />
        </div>

        <div className="create-instrument-field">
          <label htmlFor="manufacturer-name">Manufacturer name</label>
          <input type="text" name="manufacturer-name" />
        </div>

        <div className="create-instrument-field">
          <label htmlFor="manufacturer-date">Manufacturer date</label>
          <input type="date" name="manufacturer-date" />
        </div>

        <div className="create-instrument-field">
          <label htmlFor="release-date">Release date</label>
          <input type="date" name="release-date" />
        </div>

        <div className="create-instrument-field">
          <label htmlFor="country">Country</label>
          <input type="text" name="country"/>
        </div>

        <div className="create-instrument-field">
          <label htmlFor="basic-material">Basic Material</label>
          <input type="text" name="basic-material"/>
        </div>

        <input type="submit" />
      </form>
      <Footer />
    </>
  )
    ;
};