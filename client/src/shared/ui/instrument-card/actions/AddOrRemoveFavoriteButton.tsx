import { useState } from "react";
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

export const AddOrRemoveFavoriteButton = (props: Props) => {
  useJwt();
  const [favorite, setFavorite] = useState<boolean>(props.favorite);

  const toggleFavorite = async () => {
    if (favorite) {
      removeFavorite.removeFavorite(props.instrumentId, {
        withCredentials: true,
      });
    } else {
      addFavorite.addFavorite(props.instrumentId, {
        withCredentials: true,
      });
    }
    setFavorite(!favorite);
  };

  return (
    <button onClick={toggleFavorite}>
      {favorite ? "Remove from Favorite" : "Add to Favorite"}
    </button>
  );
};
