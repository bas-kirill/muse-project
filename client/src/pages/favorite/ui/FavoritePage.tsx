import { Header } from "widgets/header";
import { InstrumentCard } from "shared/ui/instrument-card/InstrumentCard";
import { useLoaderData } from "react-router-dom";
import { FavoriteLoader } from "pages/favorite";
import { Footer } from "widgets/footer";

export const FavoritePage = () => {
  const loader = useLoaderData() as FavoriteLoader;

  return (
    <>
      <Header />
      <h1>Favorite</h1>

      {loader.instrumentDetails.length == 0 && (
        <div style={{ textAlign: "center" }}>Favorite List is Empty</div>
      )}

      {loader.instrumentDetails.map((instrument) => (
        <InstrumentCard
          key={instrument.instrument_id.instrument_id}
          instrument={instrument}
          favorite={true}
        />
      ))}

      <Footer />
    </>
  );
};
