import React from 'react';
import "./Home.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export function Home() {
    return (
        <div id="home">
            <Header/>

            <div id="home-logo"></div>

            <form id="home-search-bar-form">
                <input type="text" placeholder="What instrument?" size={50}/>
                <input type="submit">Search</input>
            </form>

            <h1>Why Choose Us for Your Musical Needs</h1>

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
            <div id="trending-instruments">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <Footer/>
        </div>
    )
}

export default Home;
