import { Header } from "widgets/header";
import { InstrumentCard } from "shared/ui/instrument-card/InstrumentCard";
import { useLoaderData } from "react-router-dom";
import { FavoriteLoader } from "pages/favorite";

export const FavoritePage = () => {
  const loader = useLoaderData() as FavoriteLoader;

  return (
    <>
      <Header />
      <h1>Favorite</h1>
      {loader.instrumentDetails.map((instrument) => (
        <InstrumentCard
          key={instrument.id.toString()}
          instrument={instrument}
          favorite={true}
        />
      ))}
    </>
  );
};
