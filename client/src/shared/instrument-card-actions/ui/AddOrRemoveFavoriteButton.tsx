import React from "react";
import styles from "./styles/AddOrRemoveFavoriteButton.module.css";
import { useState } from "react";
import {
  AddFavoriteApi,
  RemoveFavoriteApi
} from "generated/api";
import { InstrumentId } from "generated/model";

interface Props {
  instrumentId: InstrumentId;
  favorite: boolean;
}

const removeFavorite = new RemoveFavoriteApi();
const addFavorite = new AddFavoriteApi();

export const AddOrRemoveFavoriteButton = (props: Props) => {
  const [favorite, setFavorite] = useState<boolean>(props.favorite);

  const toggleFavorite = async () => {
    if (favorite) {
      removeFavorite.removeFavorite(props.instrumentId, {
        withCredentials: true
      });
    } else {
      addFavorite.addFavorite(props.instrumentId, {
        withCredentials: true
      });
    }
    setFavorite(!favorite);
  };

  return (
    <button onClick={toggleFavorite} className={styles.favorite_add_remove__button}>
      {favorite ? "Remove from Favorite" : "Add to Favorite"}
    </button>
  );
};
