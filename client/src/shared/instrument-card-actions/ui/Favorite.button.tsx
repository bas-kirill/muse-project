import React, { useEffect, useRef } from "react";
import styles from "./styles/Favorite.button.module.css";
import actionBtnStyle from "./styles/Action.button.module.css";
import { useState } from "react";
import {
  AddFavoriteApi,
  ListFavoriteApi,
  RemoveFavoriteApi,
} from "generated/api";
import { InstrumentId } from "generated/model";
import Jwt from "domain/model/jwt";
import { COOKIE_JWT_KEY } from "shared/config/frontend";
import { getCookie } from "shared/cookie/cookie";

interface Props {
  instrumentId: InstrumentId;
}

const listFavorite = new ListFavoriteApi();
const removeFavorite = new RemoveFavoriteApi();
const addFavorite = new AddFavoriteApi();

export const FavoriteButton = (props: Props) => {
  const jwt = useRef<string | undefined>(getCookie(COOKIE_JWT_KEY));
  const [favorite, setFavorite] = useState<boolean>();

  useEffect(() => {
    if (jwt.current === undefined) {
      return;
    }
    const fetchFavorite = async () => {
      const favoriteRequest = await listFavorite.listFavorite({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Jwt.extractFromCookie()?.toStringValue()}`,
        },
      });

      const favoriteRawIds = favoriteRequest.data.content.map(
        it => it.instrument_id.instrument_id,
      );
      const instrumentId = props.instrumentId.instrument_id;
      setFavorite(favoriteRawIds.includes(instrumentId));
    };

    fetchFavorite();
  }, []);

  const toggleFavorite = async () => {
    if (favorite) {
      removeFavorite.removeFavorite(props.instrumentId, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Jwt.extractFromCookie()?.toStringValue()}`,
        },
      });
    } else {
      addFavorite.addFavorite(props.instrumentId, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Jwt.extractFromCookie()?.toStringValue()}`,
        },
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
