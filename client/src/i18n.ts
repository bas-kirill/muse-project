import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const I18N_INSTRUMENT_TYPE_FILTER = "instrument.type.filter";
export const I18N_INSTRUMENT_CARD_MANUFACTURER = "instrument.card.manufacturer";
export const I18N_MANUFACTURER_DATE = "instrument.manufacturer.manufacture.date";
export const I18N_RELEASE_DATE = "instrument.manufacturer.release.date"
export const I18N_COUNTRY = "country";
export const I18N_INSTRUMENT_BASIC_MATERIALS = "instrument.basic.materials";
export const I18N_INSTRUMENT_DATE_FROM = "instrument.date.from";
export const I18N_INSTRUMENT_DATE_TO = "instrument.date.to";

const resources = {
  en: {
    translation: {
      [I18N_INSTRUMENT_TYPE_FILTER]: "Type",
      [I18N_INSTRUMENT_CARD_MANUFACTURER]: "Manufacturer",
      [I18N_MANUFACTURER_DATE]: "Manufacturer Date",
      [I18N_RELEASE_DATE]: "Release Date",
      [I18N_COUNTRY]: "Country",
      [I18N_INSTRUMENT_BASIC_MATERIALS]: "Basic Materials",
      [I18N_INSTRUMENT_DATE_FROM]: "From",
      [I18N_INSTRUMENT_DATE_TO]: "To",
    }
  },
  ru: {
    translation: {
      [I18N_INSTRUMENT_TYPE_FILTER]: "Тип",
      [I18N_INSTRUMENT_CARD_MANUFACTURER]: "Производитель",
      [I18N_MANUFACTURER_DATE]: "Дата производства",
      [I18N_RELEASE_DATE]: "Дата выпуска",
      [I18N_COUNTRY]: "Страна",
      [I18N_INSTRUMENT_BASIC_MATERIALS]: "Основные материалы",
      [I18N_INSTRUMENT_DATE_FROM]: "С",
      [I18N_INSTRUMENT_DATE_TO]: "По",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: window.navigator.language,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;