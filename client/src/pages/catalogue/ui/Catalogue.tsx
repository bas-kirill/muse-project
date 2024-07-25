import React from 'react';
import "./Catalogue.css";
import {Header} from "widgets/header";
import {Footer} from "widgets/footer"
import {Link, useLoaderData} from "react-router-dom";
import {GetInstrumentsResponse} from "pages/catalogue";
import {CatalogueFilterWidget} from "widgets/catalogue-filter";
import {CatalogueSerpWidget} from "widgets/catalogue-serp";

export function Catalogue() {
    const instruments = useLoaderData() as GetInstrumentsResponse;  // https://github.com/remix-run/react-router/discussions/9792

    return (
        <div id="catalogue">
            <Header/>

            <form id="catalogue-search-bar-form">
                <input type="text" placeholder={"Search..."}/>
                <input type={"submit"} value={"Find"}/>
            </form>

            <div id="catalogue-filter-serp-wrapper">
                <CatalogueFilterWidget />
                <CatalogueSerpWidget instruments={instruments} />
            </div>

            <Footer/>
        </div>
    )
}

export default Catalogue;