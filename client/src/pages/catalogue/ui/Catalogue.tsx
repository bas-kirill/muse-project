import React, { useEffect, useState } from "react";
import "./Catalogue.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { useLoaderData } from "react-router-dom";
import { CatalogueFilterWidget, Filters } from "widgets/catalogue-filter";
import { CatalogueSerpWidget } from "widgets/catalogue-serp";
import axios from "axios";
import { API_INSTRUMENTS, SERVER_URL } from "shared/config";
import { Instruments } from "domain/model/instrument";
import Jwt from "domain/model/jwt";
import useJwt from "pages/log-in/model/use-jwt";

export function Catalogue() {
  useJwt();
  const initialInstruments = useLoaderData() as Instruments; // https://github.com/remix-run/react-router/discussions/9792
  const [instruments, setInstruments] =
    useState<Instruments>(initialInstruments);
  const [instrumentName, setInstrumentName] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({} as Filters);

  useEffect(() => {
    const fetchInstruments = async () => {
      if (instrumentName === "") {
        filters.instrumentName = null;
      }
      if (instrumentName !== "") {
        filters.instrumentName = instrumentName;
      }

      const getInstrumentsByCriteriaRequestBody = JSON.stringify(
        filters,
        null,
        2,
      );
      const { data } = await axios.post<Instruments>(
        `${SERVER_URL}${API_INSTRUMENTS}`,
        getInstrumentsByCriteriaRequestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return data;
    };

    fetchInstruments().then((r) => {
      setInstruments(r);
    });
  }, [filters, instrumentName]);

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
          onFilterChange={(newFilters: Filters) => setFilters(newFilters)}
          role={Jwt.extractFromLocalStorage()?.toRole()}
        />
        <CatalogueSerpWidget instruments={instruments} />
      </div>

      <Footer />
    </div>
  );
}

export default Catalogue;
