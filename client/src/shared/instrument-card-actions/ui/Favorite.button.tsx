import React from "react";
import styles from "./styles/Favorite.button.module.css";
import actionBtnStyle from "./styles/Action.button.module.css";
import { useState } from "react";
import { AddFavoriteApi, RemoveFavoriteApi } from "generated/api";
import { InstrumentId } from "generated/model";

interface Props {
  instrumentId: InstrumentId;
  favorite: boolean;
}

const removeFavorite = new RemoveFavoriteApi();
const addFavorite = new AddFavoriteApi();

export const FavoriteButton = (props: Props) => {
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
    <button
      onClick={toggleFavorite}
      className={`
        ${actionBtnStyle.action__button}
        ${styles.favorite__button}
        ${favorite ? styles.favorite : ""}
      `}
    >
      Favorite
    </button>
  );
};
