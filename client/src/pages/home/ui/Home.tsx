import React from "react";
import "./styles/Home.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { useJwt } from "pages/login";
import { Slide } from "react-slideshow-image";
import saxo from "pages/home/ui/images/saxo.webp";
import guitar from "pages/home/ui/images/guitar.webp";
import rock_guitar from "pages/home/ui/images/rock_guitar.webp";
import violin from "pages/home/ui/images/violin.webp";
import homeLogo from "pages/home/ui/images/home-logo.webp";

const images = [
  {
    image: saxo,
    caption: "Saxophone"
  },
  {
    image: guitar,
    caption: "Guitar"
  },
  {
    image: rock_guitar,
    caption: "Rock Guitar"
  },
  {
    image: violin,
    caption: "Violin"
  }
];

const trendingInstrumentsResponsiveSettings = [
  {
    breakpoint: 571,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 570,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
];

export function Home() {
  useJwt();

  return (
    <div id="home">
      <Header />

      <div id="home-logo" style={{
        background: `url(${homeLogo}) no-repeat center, linear-gradient(red, yellow)`,
        // animation: "fadeAnimation 2s linear  infinite"
      }}>
        <form id="home-search-bar-form">
          <input type="text" placeholder="What instrument?" />
          <input type="submit" value="Search" />
        </form>
      </div>

      <h1 style={{color: "#002244"}}>Why Choose Us for Your Musical Needs</h1>

      <div id="home-reasons-choose">
        <div>
          We offer a wide range of high-quality instruments for all skill levels
        </div>
        <div>
          Our expert staff provides personalized advice and service
        </div>
        <div>
          Enjoy competitive prices and exclusive deals on top brands
        </div>
      </div>

      <h1>Trending Instruments</h1>

      <div id={"trending-instruments"}>
        <Slide autoplay={true} responsive={trendingInstrumentsResponsiveSettings}>
          {images.map((img, index) => (
            <div key={img.image} className="each-slide">
              <img src={img.image} alt={img.caption} style={{ width: "100%", borderRadius: "5px" }} />
            </div>
          ))}
        </Slide>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
