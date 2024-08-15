import axios from "axios";
import { SERVER_URL } from "shared/config";
import { useState } from "react";

interface Props {
  instrumentId: number;
  favorite: boolean;
}

export const AddToFavoriteButton = (props: Props) => {
  const [favorite, setFavorite] = useState<boolean>(props.favorite);

  const toggleFavorite = async () => {
    if (favorite) {
      await axios.post(
        `${SERVER_URL}/api/favorite/remove`,
        {
          instrumentId: props.instrumentId,
        },
        {
          withCredentials: true,
        },
      );
    } else {
      await axios.post(
        `${SERVER_URL}/api/favorite/add`,
        {
          instrumentId: props.instrumentId,
        },
        {
          withCredentials: true,
        },
      );
    }
    setFavorite(!favorite);
  };

  return (
    <button onClick={toggleFavorite}>
      {favorite ? "Remove from Favorite" : "Add to Favorite"}
    </button>
  );
};
