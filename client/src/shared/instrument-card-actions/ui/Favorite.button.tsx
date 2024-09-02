import React, { useEffect, useState } from "react";
import styles from "./styles/Favorite.button.module.css";
import actionBtnStyle from "./styles/Action.button.module.css";
import {
  AddFavoriteApi,
  ListFavoriteApi,
  RemoveFavoriteApi,
} from "generated/api";
import { InstrumentId } from "generated/model";
import Jwt from "domain/model/jwt";
import { apiConfig } from "shared/config/api";
import { useTranslation } from "react-i18next";
import {
  I18N_HEADER_FAVORITE_BUTTON,

} from "../../../i18n";

interface Props {
  instrumentId: InstrumentId;
}

const listFavorite = new ListFavoriteApi(apiConfig);
const removeFavorite = new RemoveFavoriteApi(apiConfig);
const addFavorite = new AddFavoriteApi(apiConfig);

export const FavoriteButton = (props: Props) => {
  const { t } = useTranslation();
  const [favorite, setFavorite] = useState<boolean>();

  useEffect(() => {
    const fetchFavorite = async () => {
      const favoriteRequest = await listFavorite.listFavorite({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Jwt.extractFromCookie()?.toStringValue()}`,
        },
      });

      const favoriteRawIds = favoriteRequest.data.content.map(
        (it) => it.instrument_id.instrument_id,
      );
      const instrumentId = props.instrumentId.instrument_id;
      setFavorite(favoriteRawIds.includes(instrumentId));
    };

    const jwt = Jwt.extractFromCookie();
    if (jwt === null || jwt.expired()) {
      return;
    }
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
      {t(I18N_HEADER_FAVORITE_BUTTON)}
    </button>
  );
};
