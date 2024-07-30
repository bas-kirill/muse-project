import React from "react";
import "./EditInstrument.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { EditInstrumentLoader } from "pages/edit-instrument/api/loader";
import { EditInstrumentAction } from "pages/edit-instrument/api/action";

export const EditInstrument = () => {
  const loader = useLoaderData() as EditInstrumentLoader;
  const actionData = useActionData() as EditInstrumentAction;

  return (
    <>
      <Header />
      <h1>Edit Instrument</h1>
      <Form method="POST" id="edit-instrument">
        <div className="edit-instrument-field">
          <input type="hidden" name="instrument-id" value={loader.instrumentForEdit.id} />
        </div>

        <div className="edit-instrument-field">
          <label htmlFor="instrument-name">Instrument Name</label>
          <input type="text" name="instrument-name" defaultValue={loader.instrumentForEdit.name} required />
        </div>

        <div className="edit-instrument-field">
          <label htmlFor="instrument-type">Instrument Type</label>
          <select name="instrument-type" defaultValue={loader.instrumentForEdit.type} required>
            {loader.instrumentTypes.map((instrumentType) => (
              <option key={instrumentType} value={instrumentType}>
                {instrumentType}
              </option>
            ))}
          </select>
        </div>

        <div className="edit-instrument-field">
          <label htmlFor="manufacturer-name">Manufacturer name</label>
          <select name="manufacturer-name" defaultValue={loader.instrumentForEdit.name} required>
            {loader.manufacturerNames.map((manufacturerName) => (
              <option key={manufacturerName} value={manufacturerName}>
                {manufacturerName}
              </option>
            ))}
          </select>
        </div>

        <div className="edit-instrument-field">
          <label htmlFor="manufacturer-date">Manufacturer date</label>
          <input
            type="date"
            name="manufacturer-date"
            min="0001-01-01"
            max="9999-12-31"
            defaultValue={loader.instrumentForEdit.manufacturerDate}
            required
          />
        </div>

        <div className="edit-instrument-field">
          <label htmlFor="release-date">Release date</label>
          <input
            type="date"
            name="release-date"
            min="0001-01-01"
            max="9999-12-31"
            defaultValue={loader.instrumentForEdit.releaseDate}
            required
          />
        </div>

        <div className="edit-instrument-field">
          <label htmlFor="country">Country</label>
          <select name="country" defaultValue={loader.instrumentForEdit.country} required>
            {loader.countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="edit-instrument-field">
          <label htmlFor="material">Basic Material</label>
          <select name="material" defaultValue={loader.instrumentForEdit.basicMaterials} required>
            {loader.materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>

        <input type="submit" value="Edit Instrument" />
      </Form>
      {actionData?.errors &&
        actionData?.errors.map((error) => <div key={error}>{error}</div>)}
      <Footer />
    </>
  );
};