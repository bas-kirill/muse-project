import React from "react";
import styles from "./styles/EditInstrumentPage.module.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { EditInstrumentLoader } from "pages/edit-instrument/api/loader";
import { EditInstrumentAction } from "pages/edit-instrument/api/action";
import { InstrumentBasicMaterialFormField } from "./InstrumentBasicMaterialFormField";
import { useJwt } from "shared/jwt/use-jwt";

export const EditInstrumentPage = () => {
  useJwt();

  const loader = useLoaderData() as EditInstrumentLoader;
  const actionData = useActionData() as EditInstrumentAction;

  return (
    <>
      <HeaderWidget />
      <h1>{loader.instrumentForEdit.instrument_name.instrument_name}</h1>

      <div className={styles.edit_instrument__wrapper}>
        <img
          src={`data:image/*; base64, ${loader.instrumentPhoto.photo}`}
          width={250}
          height={300}
          alt={""}
          className={styles.edit_instrument__img}
        />
        <Form method="POST" className={styles.edit_instrument__form}>
          <div className={styles.edit_instrument__form__field}>
            <input
              type="hidden"
              name="instrument-id"
              value={loader.instrumentForEdit.instrument_id.instrument_id}
            />
          </div>

          <div className={styles.edit_instrument__form__field}>
            <label htmlFor="instrument-name" className={styles.edit_instrument__form__field__key}>Instrument
              Name</label>

            <input
              type="text"
              name="instrument-name"
              defaultValue={
                loader.instrumentForEdit.instrument_name.instrument_name
              }
              required
              className={styles.edit_instrument__form__field__value}
            />
          </div>

          <div className={styles.edit_instrument__form__field}>
            <label htmlFor="instrument-type" className={styles.edit_instrument__form__field__key}>Instrument
              Type</label>

            <select
              name="instrument-type"
              defaultValue={
                loader.instrumentForEdit.instrument_type.instrument_type
              }
              required
              className={styles.edit_instrument__form__field__value}
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

          <div className={styles.edit_instrument__form__field}>
            <label htmlFor="manufacturer-name" className={styles.edit_instrument__form__field__key}>Manufacturer
              name</label>

            <select
              name="manufacturer-name"
              defaultValue={
                loader.instrumentForEdit.manufacturer_name.manufacturer_name
              }
              required
              className={styles.edit_instrument__form__field__value}
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

          <div className={styles.edit_instrument__form__field}>
            <label htmlFor="manufacturer-date" className={styles.edit_instrument__form__field__key}>Manufacturer
              date</label>

            <input
              type="date"
              name="manufacturer-date"
              min="0001-01-01"
              max="9999-12-31"
              defaultValue={
                loader.instrumentForEdit.manufacturer_date.manufacture_date
              }
              required
              className={styles.edit_instrument__form__field__value}
            />
          </div>

          <div className={styles.edit_instrument__form__field}>
            <label htmlFor="release-date" className={styles.edit_instrument__form__field__key}>Release date</label>

            <input
              type="date"
              name="release-date"
              min="0001-01-01"
              max="9999-12-31"
              defaultValue={loader.instrumentForEdit.release_date.release_date}
              required
              className={styles.edit_instrument__form__field__value}
            />
          </div>

          <div className={styles.edit_instrument__form__field}>
            <label htmlFor="country" className={styles.edit_instrument__form__field__key}>Country</label>

            <select
              name="country"
              defaultValue={loader.instrumentForEdit.country.country}
              required
              className={styles.edit_instrument__form__field__value}
            >
              {loader.countries.map((country) => (
                <option key={country.country} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>

          <InstrumentBasicMaterialFormField
            materials={loader.materials}
            usedMaterialsForInstrument={loader.instrumentForEdit.basic_materials}
          />

          <div className={styles.edit_instrument__form__field}>
            <label htmlFor={"instrument-image"} className={styles.edit_instrument__form__field__key}>Image</label>

            <input
              type={"file"}
              name={"instrument-photo"}
              accept={"image/*"}
              className={styles.edit_instrument__form__field__value}
              required={true} />
          </div>

          <input type="submit" value="Edit" />
        </Form>
      </div>
      {actionData !== undefined && actionData.errors.length > 0 &&
        actionData.errors.map((error) => <div key={error}>{error}</div>)}
      <FooterWidget />
    </>
  );
};
