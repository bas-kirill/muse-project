import { Header } from "widgets/header";
import { InstrumentCard } from "shared/ui/instrument-card/InstrumentCard";
import { useEffect, useState } from "react";
import { Instruments } from "domain/model/instrument";
import { fetchFavoriteInstrumentIdsList } from "shared/api/fetch-favorite-instrument-ids.list";
import { Filters } from "widgets/catalogue-filter";
import { getInstrumentsByCriteria } from "shared/api/instruments-by-criteria.list";

export const FavoritePage = () => {
  // const loader = useLoaderData() as FavoriteLoader;
  const [instruments, setInstruments] = useState<Instruments>([]);

  useEffect(() => {
    const fetchFavoriteInstruments = async () => {
      const favoriteInstrumentIds = await fetchFavoriteInstrumentIdsList();
      const filter = {
        instrumentIds: favoriteInstrumentIds,
      } as unknown as Filters;
      return await getInstrumentsByCriteria(filter);
    };

    fetchFavoriteInstruments().then((instruments) =>
      setInstruments(instruments),
    );
  }, []);

  return (
    <>
      <Header />

      <h1>Favorite</h1>
      {instruments.map((instrument) => (
        <InstrumentCard
          key={instrument.id.toString()}
          instrument={instrument}
          favorite={true}
        />
      ))}
    </>
  );
};
