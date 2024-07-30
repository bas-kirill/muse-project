import React from "react";
import "./CreateInstrument.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { useActionData, useLoaderData } from "react-router-dom";
import { CreateInstrumentLoader } from "pages/create-instrument";
import { CreateInstrumentAction } from "@pages/create-instrument/api/action";

export const CreateInstrument = () => {
  const loader = useLoaderData() as CreateInstrumentLoader;
  const actionData = useActionData() as CreateInstrumentAction;

  return (
    <>
      <Header />
      <h1>Instrument Creation</h1>
      <form id="create-instrument">
        <div className="create-instrument-field">
          <label htmlFor="instrument-name">Instrument Name</label>
          <input type="text" name="instrument-name" required />
        </div>

        <div className="create-instrument-field">
          <label htmlFor="instrument-type">Instrument Type</label>
          <select name="instrument-type" required>
            {loader.instrumentTypes.map(instrumentType => (
              <option key={instrumentType} value={instrumentType}>{instrumentType}</option>
            ))}
          </select>
        </div>

        <div className="create-instrument-field">
          <label htmlFor="manufacturer-name">Manufacturer name</label>
          <input type="text" name="manufacturer-name" required />
        </div>

        <div className="create-instrument-field">
          <label htmlFor="manufacturer-date">Manufacturer date</label>
          <input type="date" name="manufacturer-date" required />
        </div>

        <div className="create-instrument-field">
          <label htmlFor="release-date">Release date</label>
          <input type="date" name="release-date" required />
        </div>

        <div className="create-instrument-field">
          <label htmlFor="country">Country</label>
          <select name="country">
            {loader.countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="create-instrument-field">
          <label htmlFor="material">Basic Material</label>
          <select name="material" required>
            {loader.materials.map(material => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>
        </div>

        <input type="submit" />
      </form>
      {actionData?.errors && (
        actionData?.errors.map(error => (
          <div key={error}>{error}</div>
        ))
      )}
      <Footer />
    </>
  );
};
