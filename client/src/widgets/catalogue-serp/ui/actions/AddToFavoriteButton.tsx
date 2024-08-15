import { Instrument } from "domain/model/instrument";
import axios from "axios";
import { SERVER_URL } from "shared/config";
import { API_FAVORITE } from "shared/config/backend";

interface Props {
  instrument: Instrument;
}

export const AddToFavoriteButton = (props: Props) => {
  const handleAddToFavorite = () => {
    axios.post(`${SERVER_URL}${API_FAVORITE}`, {
      instrumentId: props.instrument.id,
    });
  };

  return (
    <button
      key={props.instrument.id}
      className={"add-to-favorite-button"}
      onClick={handleAddToFavorite}
    >
      Favorite
    </button>
  );
};
