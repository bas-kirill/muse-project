import React, { useEffect, useRef, useState } from "react";
import "./Catalogue.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { useLoaderData } from "react-router-dom";
import {
  CatalogueFilterWidget,
  Filters,
  DEFAULT_FILTER,
} from "widgets/catalogue-filter";
import { CatalogueSerpWidget } from "widgets/catalogue-serp";
import { useJwt } from "pages/login";
import {
  CATALOGUE_DEFAULT_PAGE_NUMBER,
  CATALOGUE_DEFAULT_PAGE_SIZE,
} from "shared/config/frontend";
import { SearchBarForm } from "./SearchBarForm";
import { NavigationBar } from "./NavigationBar";
import { CatalogueLoader } from "pages/catalogue";
import { ListFavoriteApi } from "generated/api/list-favorite-api";
import { InstrumentDetail, InstrumentId, InstrumentName } from "generated/model";
import { GetInstrumentsByCriteriaPaginatedApi } from "generated/api/get-instruments-by-criteria-paginated-api";

const getInstrumentsByCriteriaPaginated =
  new GetInstrumentsByCriteriaPaginatedApi();

const listFavoriteApi = new ListFavoriteApi();

export function Catalogue() {
  useJwt();
  const loader = useLoaderData() as CatalogueLoader; // https://github.com/remix-run/react-router/discussions/9792
  const [instruments, setInstruments] = useState<InstrumentDetail[]>(
    loader.instrumentPage.content,
  );
  const [instrumentName, setInstrumentName] = useState<InstrumentName | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTER);
  const [pageNumber, setPageNumber] = useState<number>(
    CATALOGUE_DEFAULT_PAGE_NUMBER,
  );
  const totalPages = useRef<number>(0);
  const [favoriteInstrumentIds, setFavoriteInstrumentIds] = useState<InstrumentId[]>(
    loader.favoriteInstrumentIds,
  );

  useEffect(() => {
    listFavoriteApi
      .listFavorite()
      .then((favorites) =>
        setFavoriteInstrumentIds(
          favorites.data.content.map((favorite) => favorite.instrument_id),
        ),
      );

    if (instrumentName?.instrument_name === "") {
      filters.instrumentName = null;
    }
    if (instrumentName?.instrument_name !== "") {
      filters.instrumentName = instrumentName;
    }

    const fetchInstruments = async () => {
      const response = await getInstrumentsByCriteriaPaginated
        .getInstrumentsByCriteriaPaginated(
          CATALOGUE_DEFAULT_PAGE_SIZE,
          pageNumber,
          {
            instrument_name: filters.instrumentName,
            instrument_types: filters.instrumentTypes,
            manufacturer_names: filters.manufacturerNames,
            manufacture_date_from: filters.manufactureDateFrom,
            manufacture_date_to: filters.manufactureDateTo,
            release_date_from: filters.releaseDateFrom,
            release_date_to: filters.releaseDateTo,
            countries: filters.countries,
            materials: filters.materials,
            instrument_ids: filters.instrumentIds,
          },
        )
      setInstruments(response.data.content);
      totalPages.current = response.data.total_pages;
    }

    fetchInstruments();
  }, [filters, instrumentName, pageNumber]);

  return (
    <div id="catalogue">
      <Header />

      <SearchBarForm setInstrumentName={setInstrumentName} />

      <div id="catalogue-wrapper">
        <CatalogueFilterWidget
          onFilterChange={(newFilters: Filters) => {
            setFilters(newFilters);
          }}
        />

        <div id="catalogue-serp-navbar-wrapper">
          <CatalogueSerpWidget
            instruments={instruments}
            favoriteInstrumentIds={favoriteInstrumentIds}
          />
          <NavigationBar
            pageNumber={pageNumber}
            totalPages={totalPages.current}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Catalogue;
