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
import { type GetInstrumentCriteriaRequestBody, InstrumentDetail } from "generated/model";
import { GetInstrumentsByCriteriaPaginatedApi } from "generated/api/get-instruments-by-criteria-paginated-api";
import { ListFavoriteApi } from "generated/api/list-favorite-api";

const getInstrumentsByCriteriaPaginated =
  new GetInstrumentsByCriteriaPaginatedApi();

const listFavoriteApi = new ListFavoriteApi();

export function Catalogue() {
  useJwt();
  const loader = useLoaderData() as CatalogueLoader; // https://github.com/remix-run/react-router/discussions/9792
  const [instruments, setInstruments] = useState<InstrumentDetail[]>(
    loader.instrumentPage.content,
  );
  const [instrumentName, setInstrumentName] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTER);
  const [pageNumber, setPageNumber] = useState<number>(
    CATALOGUE_DEFAULT_PAGE_NUMBER,
  );
  const totalPages = useRef<number>(0);
  const [favoriteInstrumentIds, setFavoriteInstrumentIds] = useState<number[]>(
    loader.favoriteInstrumentIds,
  );

  useEffect(() => {
    listFavoriteApi.listFavorite().then((favorites) =>
      setFavoriteInstrumentIds(favorites.data.content.map(favorite => favorite.id)),
    )

    if (instrumentName === "") {
      filters.instrumentName = null;
    }
    if (instrumentName !== "") {
      filters.instrumentName = instrumentName;
    }

    getInstrumentsByCriteriaPaginated.getInstrumentsByCriteriaPaginated(
      CATALOGUE_DEFAULT_PAGE_SIZE,
      pageNumber,
      JSON.stringify(filters, null, 2) as GetInstrumentCriteriaRequestBody,
    ).then((r) => {
      setInstruments(r.data.content);
      totalPages.current = r.data.total_pages;
    });
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
