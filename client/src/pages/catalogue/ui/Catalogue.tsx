import React, { useEffect, useRef, useState } from "react";
import "./Catalogue.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { useLoaderData } from "react-router-dom";
import { CatalogueFilterWidget, Filters, DEFAULT_FILTER } from "widgets/catalogue-filter";
import { CatalogueSerpWidget } from "widgets/catalogue-serp";
import { Instruments } from "domain/model/instrument";
import Jwt from "domain/model/jwt";
import { useJwt } from "pages/log-in";
import { CATALOGUE_DEFAULT_PAGE_NUMBER, CATALOGUE_DEFAULT_PAGE_SIZE } from "shared/config/frontend";
import { getInstrumentsByCriteria } from "shared/api/list-instruments-by-criteria";
import { Page } from "domain/model/page";

export function Catalogue() {
  useJwt();
  const initialInstruments = useLoaderData() as Instruments; // https://github.com/remix-run/react-router/discussions/9792
  const [instruments, setInstruments] = useState<Instruments>(initialInstruments);
  const [instrumentName, setInstrumentName] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTER);
  const [pageNumber, setPageNumber] = useState<number>(CATALOGUE_DEFAULT_PAGE_NUMBER);
  const totalPages = useRef<number>(0);

  useEffect(() => {
    if (instrumentName === "") {
      filters.instrumentName = null;
    }
    if (instrumentName !== "") {
      filters.instrumentName = instrumentName;
    }
    const page = {
      pageNumber: pageNumber,
      pageSize: CATALOGUE_DEFAULT_PAGE_SIZE,
    } as Page;
    getInstrumentsByCriteria(filters, page)
      .then((r) => {
        setInstruments(r.content);
        totalPages.current = r.totalPages;
      });
  }, [filters, instrumentName, pageNumber]);

  return (
    <div id="catalogue">
      <Header />

      <div id="catalogue-search-bar-form">
        <input
          type="text"
          placeholder={"Search..."}
          onChange={(e) => {
            setInstrumentName(e.target.value);
          }}
        />
      </div>

      <div id="catalogue-filter-serp-wrapper">
        <CatalogueFilterWidget
          onFilterChange={(newFilters: Filters) => {
            setFilters(newFilters);
            console.log("Called catalogue filter widget");
          }}
          role={Jwt.extractFromLocalStorage()?.toRole()}
        />
        <div id="catalogue-serp-and-navbar-wrapper">
          <CatalogueSerpWidget instruments={instruments} />
          <div id="pages-navigation-bar">
            {(pageNumber > 1) && (
              <button onClick={() => setPageNumber(pageNumber - 1)}>
                Previous
              </button>
            )}
            {(pageNumber < totalPages.current) && (
              <button onClick={() => setPageNumber(pageNumber + 1)}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Catalogue;
