import React from "react";
import styles from "./styles/Home.page.module.css";
import "react-slideshow-image/dist/styles.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { Slide } from "react-slideshow-image";
import saxophone from "pages/home/ui/images/saxo.webp";
import guitar from "pages/home/ui/images/guitar.webp";
import rock_guitar from "pages/home/ui/images/rock_guitar.webp";
import violin from "pages/home/ui/images/violin.webp";
import homeLogo from "pages/home/ui/images/home-logo.webp";

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
  return (
    <div className={styles.home}>
      <HeaderWidget />

      <div
        className={styles.home_logo}
        style={{
          background: `url(${homeLogo}) no-repeat center, linear-gradient(blue, cyan)`,
        }}
      >
        <form className={styles.search_bar__form}>
          <input type="text" placeholder="What instrument?" />
          <input type="submit" value="Search" />
        </form>
      </div>

      <h1 style={{ color: "#002244" }}>Why Choose Us for Your Musical Needs</h1>

      <div className={styles.reasons}>
        <div>
          We offer a wide range of high-quality instruments for all skill levels
        </div>
        <div>Our expert staff provides personalized advice and service</div>
        <div>Enjoy competitive prices and exclusive deals on top brands</div>
      </div>

      <h1>Trending Instruments</h1>

      <div className={styles.trends}>
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
