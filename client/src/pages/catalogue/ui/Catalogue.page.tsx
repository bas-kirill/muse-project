import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Catalogue.page.module.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { useLoaderData } from "react-router-dom";
import { SidebarFilterWidget, Filters } from "widgets/catalogue-filter";
import { SerpWidget } from "widgets/catalogue-serp";
import { CATALOGUE_DEFAULT_PAGE_SIZE } from "shared/config/frontend";
import { ListFavoriteApi } from "generated/api/list-favorite-api";
import { InstrumentDetail, InstrumentId } from "generated/model";
import { GetInstrumentsByCriteriaPaginatedApi } from "generated/api";
import { CatalogueLoader } from "pages/catalogue";
import { NavigationBarWidget } from "widgets/catalogue-navbar";
import { SearchBarInputField } from "pages/catalogue/ui/SearchBarInput.field";

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
    <>
      <HeaderWidget />

      <div className={styles.catalogue__wrapper}>
        <SearchBarInputField filters={filters} setFilters={setFilters} />

        <div className={styles.catalogue__filters__serp__navbar__wrapper}>
          <div className={styles.catalogue__filters__wrapper}>
            <SidebarFilterWidget onFilterChange={setFilters} />
          </div>

          <div className={styles.catalogue__serp__navbar__wrapper}>
            <SerpWidget
              instruments={instruments}
              favoriteInstrumentIds={favoriteInstrumentIds}
            />
            <NavigationBarWidget
              totalPages={totalPages.current}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </div>
        </div>
      </div>

      <FooterWidget />
    </>
  );
}

export default CataloguePage;
