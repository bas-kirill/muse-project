import React, { useEffect, useRef, useState } from "react";
import "./styles/CataloguePage.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { useLoaderData } from "react-router-dom";
import { CatalogueFilterWidget, Filters } from "widgets/catalogue-filter";
import { CatalogueSerpWidget } from "widgets/catalogue-serp";
import { CATALOGUE_DEFAULT_PAGE_SIZE } from "shared/config/frontend";
import { SearchBarForm } from "./SearchBarForm";
import { NavigationBar } from "./NavigationBar";
import { ListFavoriteApi } from "generated/api/list-favorite-api";
import { InstrumentDetail, InstrumentId } from "generated/model";
import { GetInstrumentsByCriteriaPaginatedApi } from "generated/api/get-instruments-by-criteria-paginated-api";
import { CatalogueLoader } from "pages/catalogue";

const getInstrumentsByCriteriaPaginated =
  new GetInstrumentsByCriteriaPaginatedApi();

const listFavoriteApi = new ListFavoriteApi();

export function CataloguePage() {
  const loader = useLoaderData() as CatalogueLoader; // https://github.com/remix-run/react-router/discussions/9792

  const [instruments, setInstruments] = useState<InstrumentDetail[]>(
    loader.instrumentPage.content,
  );
  const [filters, setFilters] = useState<Filters>(loader.defaultFilter);
  const [pageNumber, setPageNumber] = useState<number>(
    loader.instrumentPage.page_number,
  );
  const totalPages = useRef<number>(loader.instrumentPage.total_pages);
  const [favoriteInstrumentIds, setFavoriteInstrumentIds] = useState<
    InstrumentId[]
  >(loader.favoriteInstrumentIds);

  useEffect(() => {
    const fetchFavorite = async () => {
      const response = await listFavoriteApi.listFavorite({
        withCredentials: true,
      });
      setFavoriteInstrumentIds(
        response.data.content.map((favorite) => favorite.instrument_id),
      );
    };

    fetchFavorite();

    const fetchInstruments = async () => {
      const response =
        await getInstrumentsByCriteriaPaginated.getInstrumentsByCriteriaPaginated(
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
        );
      setInstruments(response.data.content);
      totalPages.current = response.data.total_pages;
    };

    fetchInstruments();
  }, [filters, pageNumber]);

  return (
    <div id="catalogue">
      <HeaderWidget />

      <SearchBarForm filters={filters} setFilters={setFilters} />

      <div id="catalogue-wrapper">
        <CatalogueFilterWidget onFilterChange={setFilters} />

        <div id="catalogue-serp-navbar-wrapper">
          <CatalogueSerpWidget
            instruments={instruments}
            favoriteInstrumentIds={favoriteInstrumentIds}
          />
          <NavigationBar
            totalPages={totalPages.current}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>

      <FooterWidget />
    </div>
  );
}

export default CataloguePage;
