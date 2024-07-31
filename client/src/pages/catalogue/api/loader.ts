import axios from "axios";
import { Instruments } from "domain/model/instrument";
import { Page } from "domain/model/page";
import { API_INSTRUMENTS, SERVER_URL } from "shared/config/backend";

export const loader = async (): Promise<Instruments> => {
  const { data, status } = await axios.post<Page>(
    `${SERVER_URL}${API_INSTRUMENTS}`,
    {},
    {
      params: {
        pageNumber: 1,
        pageSize: 3,
      },
    },
  );
  if (status !== 200) {
    throw new Error(`Failed to extract instruments`);
  }
  return data.content;
};
