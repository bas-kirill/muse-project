import axios from "axios";
import { SERVER_URL } from "shared/config";

export const fetchFavoriteInstrumentIds = async () => {
  const { data, status } = await axios.get<number[]>(
    `${SERVER_URL}/api/favorite/list`,
    {
      withCredentials: true
    }
  );

  if (status !== 200) {
    throw new Error("Failed to extract favorite instruments");
  }

  return data;
};