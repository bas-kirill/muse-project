import React from "react";
import styles from "./styles/CreateInstrument.page.module.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { CreateInstrumentLoader } from "pages/create-instrument";
import { CreateInstrumentAction } from "pages/create-instrument/api/action";
import {
  I18N_COUNTRY,
  I18N_MANUFACTURER_DATE,
  I18N_RELEASE_DATE,
} from "../../../i18n";
import { useTranslation } from "react-i18next";

export const CreateInstrumentPage = () => {
  const { t, i18n } = useTranslation();
  const loader = useLoaderData() as CreateInstrumentLoader;
  const actionData = useActionData() as CreateInstrumentAction;

  return (
    <>
      <HeaderWidget />

      <h1 className={styles.h1}>Create Instrument</h1>

      <Form method="POST" className={styles.create_instrument__form}>
        <div className={styles.create_instrument__form__field}>
          <label
            htmlFor="instrument-name"
            className={styles.create_instrument__form__field__key}
          >
            Instrument name
          </label>

          <input
            type="text"
            name="instrument-name"
            className={styles.create_instrument__form__field__value}
            required
          />
        </div>

        <div className={styles.create_instrument__form__field}>
          <label
            htmlFor="instrument-type"
            className={styles.create_instrument__form__field__key}
          >
            Instrument Type
          </label>

          <select
            name="instrument-type"
            className={styles.create_instrument__form__field__value}
            required
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

        <div className={styles.create_instrument__form__field}>
          <label
            htmlFor="manufacturer-name"
            className={styles.create_instrument__form__field__key}
          >
            Manufacturer name
          </label>
          <select
            name="manufacturer-name"
            className={styles.create_instrument__form__field__value}
            required
          >
            {loader.manufacturerTypes.map((manufacturer) => (
              <option
                key={manufacturer.i18n_code}
                value={manufacturer.localized_message}
              >
                {manufacturer.localized_message}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.create_instrument__form__field}>
          <label
            htmlFor="manufacturer-date"
            className={styles.create_instrument__form__field__key}
          >
            {t(I18N_MANUFACTURER_DATE)}
          </label>

          <input
            type="date"
            name="manufacturer-date"
            min="0001-01-01"
            max="9999-12-31"
            className={styles.create_instrument__form__field__value}
            required
          />
        </div>

        <div className={styles.create_instrument__form__field}>
          <label
            htmlFor="release-date"
            className={styles.create_instrument__form__field__key}
          >
            {t(I18N_RELEASE_DATE)}
          </label>

          <input
            type="date"
            name="release-date"
            min="0001-01-01"
            max="9999-12-31"
            className={styles.create_instrument__form__field__value}
            required
          />
        </div>

        <div className={styles.create_instrument__form__field}>
          <label
            htmlFor="country"
            className={styles.create_instrument__form__field__key}
          >
            {t(I18N_COUNTRY)}
          </label>

          <select
            name="country"
            className={styles.create_instrument__form__field__value}
            required
          >
            {loader.countries.map((country) => (
              <option key={country.i18n_code} value={country.localized_text}>
                {country.localized_text}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.create_instrument__form__field}>
          <label
            htmlFor="material"
            className={styles.create_instrument__form__field__key}
          >
            Basic Material
          </label>

          <select
            name="material"
            className={styles.create_instrument__form__field__value}
            required
          >
            {loader.materials.map((material) => (
              <option key={material.i18n_code} value={material.localized_text}>
                {material.localized_text}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.create_instrument__form__field}>
          <label
            htmlFor={"instrument-image"}
            className={styles.create_instrument__form__field__key}
          >
            Image Photo
          </label>

          <input
            type={"file"}
            name={"instrument-photo"}
            accept={"image/*"}
            className={styles.create_instrument__form__field__value}
            required={true}
          />
        </div>

        <input type="submit" value="Create Instrument" />
      </Form>

      {actionData?.errors &&
        actionData?.errors.map((error) => <div key={error}>{error}</div>)}
      <FooterWidget />
    </>
  );
};
