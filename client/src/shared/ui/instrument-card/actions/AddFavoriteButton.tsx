import { useRef } from "react";
import { useJwt } from "pages/login";
import { RemoveFavoriteApi } from "generated/api/remove-favorite-api";
import { AddFavoriteApi } from "generated/api/add-favorite-api";
import { InstrumentId } from "generated/model";

interface Props {
  instrumentId: InstrumentId;
  favorite: boolean;
}

const removeFavorite = new RemoveFavoriteApi();
const addFavorite = new AddFavoriteApi();

export const AddFavoriteButton = (props: Props) => {
  useJwt();
  const favoriteRef = useRef<boolean>(props.favorite);

  const toggleFavorite = async () => {
    if (favoriteRef.current) {
      removeFavorite.removeFavorite(
        props.instrumentId,
        {
          withCredentials: true,
        },
      );
    } else {
      addFavorite.addFavorite(
        {
          instrument_id: props.instrumentId,
        },
        {
          withCredentials: true,
        },
      );
    }
    favoriteRef.current = !favoriteRef.current;
  };

  return (
    <button onClick={toggleFavorite}>
      {favoriteRef.current ? "Remove from Favorite" : "Add to Favorite"}
    </button>
  );
};
