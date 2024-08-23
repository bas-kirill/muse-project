import React from "react";
import "./EditInstrument.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { EditInstrumentLoader } from "pages/edit-instrument/api/loader";
import { EditInstrumentAction } from "pages/edit-instrument/api/action";
import { InstrumentBasicMaterialFormField } from "./fields/InstrumentBasicMaterial";
import { BasicMaterial } from "generated/model";

export const EditInstrument = () => {
  const loader = useLoaderData() as EditInstrumentLoader;
  const actionData = useActionData() as EditInstrumentAction;

  return (
    <>
      <Header />
      <h1>{loader.instrumentForEdit.instrument_name.instrument_name}</h1>
      <Form method="POST" id="edit-instrument">
        <div className="edit-instrument-field">
          <input
            type="hidden"
            name="instrument-id"
            value={loader.instrumentForEdit.instrument_id.instrument_id}
          />
        </div>

        <div className="edit-instrument-field">
          <div className={"edit-instrument-field-name"}>
            <label htmlFor="instrument-name">Instrument Name</label>
          </div>

          <div className={"edit-instrument-field-value"}>
            <input
              type="text"
              name="instrument-name"
              defaultValue={loader.instrumentForEdit.instrument_name.instrument_name}
              required
            />
          </div>
        </div>

        <div className="edit-instrument-field">
          <div className={"edit-instrument-field-name"}>
            <label htmlFor="instrument-type">Instrument Type</label>
          </div>

          <div className={"edit-instrument-field-value"}>
            <select
              name="instrument-type"
              defaultValue={loader.instrumentForEdit.instrument_type.instrument_type}
              required
            >
              {loader.instrumentTypes.map((instrumentType) => (
                <option
                  key={instrumentType.instrument_type}
                  value={instrumentType.instrument_type}
                >
                  {instrumentType.instrument_type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="edit-instrument-field">
          <div className={"edit-instrument-field-name"}>
            <label htmlFor="manufacturer-name">Manufacturer name</label>
          </div>

          <div className={"edit-instrument-field-value"}>
            <select
              name="manufacturer-name"
              defaultValue={loader.instrumentForEdit.manufacturer_name.manufacturer_name}
              required
            >
              {loader.manufacturers.map((manufacturer) => (
                <option
                  key={manufacturer.manufacturer}
                  value={manufacturer.manufacturer}
                >
                  {manufacturer.manufacturer}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="edit-instrument-field">
          <div className={"edit-instrument-field-name"}>
            <label htmlFor="manufacturer-date">Manufacturer date</label>
          </div>

          <div className={"edit-instrument-field-value"}>
            <input
              type="date"
              name="manufacturer-date"
              min="0001-01-01"
              max="9999-12-31"
              defaultValue={loader.instrumentForEdit.manufacturer_date.manufacture_date}
              required
            />
          </div>
        </div>

        <div className="edit-instrument-field">
          <div className={"edit-instrument-field-name"}>
            <label htmlFor="release-date">Release date</label>
          </div>

          <div className={"edit-instrument-field-value"}>
            <input
              type="date"
              name="release-date"
              min="0001-01-01"
              max="9999-12-31"
              defaultValue={loader.instrumentForEdit.release_date.release_date}
              required
            />
          </div>
        </div>

        <div className="edit-instrument-field">
          <div className={"edit-instrument-field-name"}>
            <label htmlFor="country">Country</label>
          </div>

          <div className={"edit-instrument-field-value"}>
            <select
              name="country"
              defaultValue={loader.instrumentForEdit.country.country}
              required
            >
              {loader.countries.map((country) => (
                <option key={country.country} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <InstrumentBasicMaterialFormField
          materials={loader.materials}
          usedMaterialsForInstrument={loader.instrumentForEdit.basic_materials}
        />

        <input type="submit" value="Edit" />
      </Form>
      {actionData.errors.length > 0 &&
        actionData?.errors.map((error) => <div key={error}>{error}</div>)}
      <Footer />
    </>
  );
};
