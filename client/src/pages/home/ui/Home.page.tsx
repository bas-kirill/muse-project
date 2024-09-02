import React from "react";
import styles from "./styles/Home.page.module.scss";
import darkStyles from "shared/styles/dark-mode.module.scss";
import "react-slideshow-image/dist/styles.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { Slide } from "react-slideshow-image";
import saxophone from "pages/home/ui/images/saxo.webp";
import guitar from "pages/home/ui/images/guitar.webp";
import rock_guitar from "pages/home/ui/images/rock_guitar.webp";
import violin from "pages/home/ui/images/violin.webp";
import homeLogo from "pages/home/ui/images/home-logo.webp";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";
import { useTranslation } from "react-i18next";
import {
  I18N_HOME_SEARCH_BAR_BUTTON,
  I18N_HOME_SEARCH_BAR_INPUT,
  I18N_REASONS_FIRST,
  I18N_REASONS_H1,
  I18N_REASONS_SECOND,
  I18N_REASONS_THIRD,
  I18N_TRENDS_H1,
} from "../../../i18n";

const images = [
  {
    image: saxophone,
    caption: "Saxophone",
  },
  {
    image: guitar,
    caption: "Guitar",
  },
  {
    image: rock_guitar,
    caption: "Rock Guitar",
  },
  {
    image: violin,
    caption: "Violin",
  },
];

const trendingInstrumentsResponsiveSettings = [
  {
    breakpoint: 571,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 570,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

export function HomePage() {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  return (
    <div className={styles.home}>
      <HeaderWidget />

      <div
        className={styles.home_logo}
        style={{
          background: `url(${homeLogo}) no-repeat center, linear-gradient(blue, cyan)`,
        }}
      >
        <form
          className={`${styles.search_bar__form} ${darkMode && darkStyles.text_dark_mode}`}
        >
          <input
            type="text"
            placeholder={t(I18N_HOME_SEARCH_BAR_INPUT)}
            className={`${styles.search_bar__form__input__text}`}
          />
          <input
            type="submit"
            value={t(I18N_HOME_SEARCH_BAR_BUTTON)}
            className={`${styles.search_bar__form__input__submit}`}
          />
        </form>
      </div>

      <h1
        className={`${darkMode ? styles.reason__h1__dark_mode : styles.reason__h1}`}
      >
        {t(I18N_REASONS_H1)}
      </h1>

      <div
        className={`${styles.reasons} ${darkMode && darkStyles.text_dark_mode}`}
      >
        <div>{t(I18N_REASONS_FIRST)}</div>
        <div>{t(I18N_REASONS_SECOND)}</div>
        <div>{t(I18N_REASONS_THIRD)}</div>
      </div>

      <h1
        className={`${styles.trends__h1} ${darkMode && darkStyles.text_dark_mode}`}
      >
        {t(I18N_TRENDS_H1)}
      </h1>

      <div className={styles.trends__slider}>
        <Slide
          autoplay={true}
          responsive={trendingInstrumentsResponsiveSettings}
        >
          {images.map((img) => (
            <div key={img.image} className={styles.each_slide}>
              <img
                src={img.image}
                alt={img.caption}
                style={{ width: "100%", borderRadius: "0.5em" }}
              />
            </div>
          ))}
        </Slide>
      </div>

      <FooterWidget />
    </div>
  );
}

export default HomePage;
