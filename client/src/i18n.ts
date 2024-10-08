import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const I18N_HEADER_HOME_BUTTON = "header.home.button";
export const I18N_HEADER_CATALOGUE_BUTTON = "header.catalogue.button";
export const I18N_HEADER_FAVORITE_BUTTON = "header.favorite.button";
export const I18N_HEADER_LOGIN_BUTTON = "header.login.button";
export const I18N_HEADER_PROFILE_BUTTON = "header.profile.button";

export const I18N_HOME_SEARCH_BAR_INPUT = "home.searchbar.input";
export const I18N_HOME_SEARCH_BAR_BUTTON = "home.searchbar.button";

export const I18N_REASONS_H1 = "home.reasons.h1";

export const I18N_REASONS_FIRST = "home.reasons.first";
export const I18N_REASONS_SECOND = "home.reasons.second";
export const I18N_REASONS_THIRD = "home.reasons.third";

export const I18N_TRENDS_H1 = "home.trends.h1";

export const I18N_INSTRUMENT_TYPE_FILTER = "instrument.type.filter";
export const I18N_INSTRUMENT_CARD_MANUFACTURER = "instrument.card.manufacturer";
export const I18N_MANUFACTURER_DATE =
  "instrument.manufacturer.manufacture.date";
export const I18N_RELEASE_DATE = "instrument.manufacturer.release.date";
export const I18N_COUNTRY = "country";
export const I18N_INSTRUMENT_BASIC_MATERIALS = "instrument.basic.materials";
export const I18N_INSTRUMENT_DATE_FROM = "instrument.date.from";
export const I18N_INSTRUMENT_DATE_TO = "instrument.date.to";

export const I18N_INSTRUMENT_CARD_SHOW_BUTTON = "instrument.card.show.button";
export const I18N_INSTRUMENT_CARD_REMOVE_BUTTON = "instrument.remove.button";
export const I18N_INSTRUMENT_CARD_EDIT_BUTTON = "instrument.edit.button";
export const I18N_INSTRUMENT_CARD_FAVORITE_BUTTON =
  "instrument.favorite.button";

export const I18N_LOGIN_INPUT = "login.login.input";
export const I18N_LOGIN_PASSWORD_INPUT = "login.login.password";
export const I18N_LOGIN_BUTTON = "login.login.button";
export const I18N_REGISTRATION_BUTTON = "login.registration.button";

export const I18N_PROFILE_NAME_SPAN = "profile.name.span";
export const I18N_PROFILE_ROLE_SPAN = "profile.role.span";

export const I18N_DARK_MODE_BUTTON = "dark-mode.button";
export const I18N_LOGOUT_BUTTON = "logout.button";

export const I18N_FAVORITE_H1 = "favorite.h1";

export const I18N_FOOTER = "footer";

export const I18N_NAVBAR_PREVIOUS = "navbar.previous";
export const I18N_NAVBAR_NEXT = "navbar.next";

const resources = {
  en: {
    translation: {
      [I18N_HEADER_HOME_BUTTON]: "Home",
      [I18N_HEADER_CATALOGUE_BUTTON]: "Catalogue",
      [I18N_HEADER_FAVORITE_BUTTON]: "Favorite",
      [I18N_HEADER_LOGIN_BUTTON]: "Login",
      [I18N_HEADER_PROFILE_BUTTON]: "Profile",

      [I18N_HOME_SEARCH_BAR_INPUT]: "What instrument?",
      [I18N_HOME_SEARCH_BAR_BUTTON]: "Search",
      [I18N_REASONS_H1]: "Why Choose Us for Your Musical Needs",
      [I18N_REASONS_FIRST]:
        "We offer a wide range of high-quality instruments for all skill levels",
      [I18N_REASONS_SECOND]:
        "Our expert staff provides personalized advice and service",
      [I18N_REASONS_THIRD]:
        "Enjoy competitive prices and exclusive deals on top brands",
      [I18N_TRENDS_H1]: "Trending Instruments",
      [I18N_INSTRUMENT_TYPE_FILTER]: "Type",
      [I18N_INSTRUMENT_CARD_MANUFACTURER]: "Manufacturer",
      [I18N_MANUFACTURER_DATE]: "Manufacturer Date",
      [I18N_RELEASE_DATE]: "Release Date",
      [I18N_COUNTRY]: "Country",
      [I18N_INSTRUMENT_BASIC_MATERIALS]: "Basic Materials",
      [I18N_INSTRUMENT_DATE_FROM]: "From",
      [I18N_INSTRUMENT_DATE_TO]: "To",

      [I18N_INSTRUMENT_CARD_REMOVE_BUTTON]: "Remove",
      [I18N_INSTRUMENT_CARD_EDIT_BUTTON]: "Edit",
      [I18N_INSTRUMENT_CARD_FAVORITE_BUTTON]: "Favorite",
      [I18N_INSTRUMENT_CARD_SHOW_BUTTON]: "Show",

      [I18N_LOGIN_INPUT]: "Login",
      [I18N_LOGIN_PASSWORD_INPUT]: "Password",
      [I18N_LOGIN_BUTTON]: "Login",
      [I18N_REGISTRATION_BUTTON]: "Registration",

      [I18N_DARK_MODE_BUTTON]: "Dark Mode",
      [I18N_LOGOUT_BUTTON]: "Logout",

      [I18N_PROFILE_NAME_SPAN]: "Name",
      [I18N_PROFILE_ROLE_SPAN]: "Role",

      [I18N_FOOTER]: "Muse Group Frontend Academy",

      [I18N_NAVBAR_PREVIOUS]: "Previous",
      [I18N_NAVBAR_NEXT]: "Next",

      [I18N_FAVORITE_H1]: "Favorite",
    },
  },
  ru: {
    translation: {
      [I18N_HEADER_HOME_BUTTON]: "Домашняя страница",
      [I18N_HEADER_CATALOGUE_BUTTON]: "Каталог",
      [I18N_HEADER_FAVORITE_BUTTON]: "Любимое",
      [I18N_HEADER_LOGIN_BUTTON]: "Логин",
      [I18N_HEADER_PROFILE_BUTTON]: "Профиль",

      [I18N_HOME_SEARCH_BAR_INPUT]: "Какой инструмент?",
      [I18N_HOME_SEARCH_BAR_BUTTON]: "Поиск",
      [I18N_REASONS_H1]: "Почему вы выберете нас",
      [I18N_REASONS_FIRST]:
        "Мы предлагаем широкий ассортимент высококачественных инструментов для всех уровней квалификации",
      [I18N_REASONS_SECOND]:
        "Наш квалифицированный персонал предоставляет индивидуальные консультации и обслуживание",
      [I18N_REASONS_THIRD]:
        "Наслаждайтесь конкурентоспособными ценами и эксклюзивными предложениями от ведущих брендов",
      [I18N_TRENDS_H1]: "Тренды",
      [I18N_INSTRUMENT_TYPE_FILTER]: "Тип",
      [I18N_INSTRUMENT_CARD_MANUFACTURER]: "Производитель",
      [I18N_MANUFACTURER_DATE]: "Дата производства",
      [I18N_RELEASE_DATE]: "Дата выпуска",
      [I18N_COUNTRY]: "Страна",
      [I18N_INSTRUMENT_BASIC_MATERIALS]: "Основные материалы",
      [I18N_INSTRUMENT_DATE_FROM]: "С",
      [I18N_INSTRUMENT_DATE_TO]: "По",

      [I18N_INSTRUMENT_CARD_REMOVE_BUTTON]: "Удалить",
      [I18N_INSTRUMENT_CARD_EDIT_BUTTON]: "Редактировать",
      [I18N_INSTRUMENT_CARD_FAVORITE_BUTTON]: "Любимое",
      [I18N_INSTRUMENT_CARD_SHOW_BUTTON]: "Показать",

      [I18N_NAVBAR_PREVIOUS]: "Предыдущий",
      [I18N_NAVBAR_NEXT]: "Следующий",

      [I18N_LOGIN_INPUT]: "Логин",
      [I18N_LOGIN_PASSWORD_INPUT]: "Пароль",
      [I18N_LOGIN_BUTTON]: "Войти",
      [I18N_REGISTRATION_BUTTON]: "Регистрация",

      [I18N_PROFILE_NAME_SPAN]: "Имя",
      [I18N_PROFILE_ROLE_SPAN]: "Роль",

      [I18N_DARK_MODE_BUTTON]: "Темная тема",
      [I18N_LOGOUT_BUTTON]: "Выйти",

      [I18N_FAVORITE_H1]: "Любимое",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: window.navigator.language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
