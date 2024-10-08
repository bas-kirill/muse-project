import React from "react";
import styles from "./styles/EditInstrument.page.module.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { EditInstrumentLoader } from "pages/edit-instrument/api/loader";
import { EditInstrumentAction } from "pages/edit-instrument/api/action";
import { InstrumentBasicMaterialField } from "./InstrumentBasicMaterial.field";
import { useJwt } from "shared/jwt/use-jwt";
import {
  I18N_COUNTRY,
  I18N_MANUFACTURER_DATE,
  I18N_RELEASE_DATE,
} from "../../../i18n";
import { useTranslation } from "react-i18next";

export const EditInstrumentPage = () => {
  useJwt();

  const { t, i18n } = useTranslation();
  const loader = useLoaderData() as EditInstrumentLoader;
  const actionData = useActionData() as EditInstrumentAction;

  return (
    <>
      <HeaderWidget />
      <h1 className={styles.h1}>
        {loader.instrumentForEdit.instrument_name.instrument_name}
      </h1>

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
            <label
              htmlFor="instrument-name"
              className={styles.edit_instrument__form__field__key}
            >
              Instrument Name
            </label>

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
            <label
              htmlFor="instrument-type"
              className={styles.edit_instrument__form__field__key}
            >
              Instrument Type
            </label>

            <select
              name="instrument-type"
              defaultValue={
                loader.instrumentForEdit.instrument_type.localized_text
              }
              required
              className={styles.edit_instrument__form__field__value}
            >
              {loader.instrumentTypes.map((instrumentType) => (
                <option
                  key={instrumentType.i18n_code}
                  value={instrumentType.localized_text}
                >
                  {instrumentType.localized_text}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.edit_instrument__form__field}>
            <label
              htmlFor="manufacturer-name"
              className={styles.edit_instrument__form__field__key}
            >
              Manufacturer name
            </label>

            <select
              name="manufacturer-name"
              defaultValue={
                loader.instrumentForEdit.manufacturer_type.localized_message
              }
              required
              className={styles.edit_instrument__form__field__value}
            >
              {loader.manufacturerTypes.map((manufacturer) => (
                <option
                  key={manufacturer.i18n_code}
                  value={manufacturer.localized_message}
                >
                  {manufacturer.i18n_code}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.edit_instrument__form__field}>
            <label
              htmlFor="manufacturer-date"
              className={styles.edit_instrument__form__field__key}
            >
              {t(I18N_MANUFACTURER_DATE)}
            </label>

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
            <label
              htmlFor="release-date"
              className={styles.edit_instrument__form__field__key}
            >
              {t(I18N_RELEASE_DATE)}
            </label>

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
            <label
              htmlFor="country"
              className={styles.edit_instrument__form__field__key}
            >
              {t(I18N_COUNTRY)}
            </label>

            <select
              name="country"
              defaultValue={loader.instrumentForEdit.country.localized_text}
              required
              className={styles.edit_instrument__form__field__value}
            >
              {loader.countries.map((country) => (
                <option key={country.i18n_code} value={country.localized_text}>
                  {country.localized_text}
                </option>
              ))}
            </select>
          </div>

          <InstrumentBasicMaterialField
            materials={loader.materials}
            usedMaterialsForInstrument={
              loader.instrumentForEdit.basic_materials
            }
          />

          <div className={styles.edit_instrument__form__field}>
            <label
              htmlFor={"instrument-image"}
              className={styles.edit_instrument__form__field__key}
            >
              Image Photo
            </label>

            <input
              type={"file"}
              name={"instrument-photo"}
              accept={"image/*"}
              className={styles.edit_instrument__form__field__value}
              required={true}
            />
          </div>

          <input
            type="submit"
            value="Edit"
            className={styles.edit_instrument__button}
          />
        </Form>
      </div>
      {actionData !== undefined &&
        actionData.errors.length > 0 &&
        actionData.errors.map((error) => <div key={error}>{error}</div>)}
      <FooterWidget />
    </>
  );
};
