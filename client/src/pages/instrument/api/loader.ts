import { LoaderFunction } from "react-router-dom";
import { InstrumentDetail } from "generated/model";
import { GetInstrumentByIdApi } from "generated/api/get-instrument-by-id-api";
import { ListFavoriteApi } from "generated/api/list-favorite-api";
import { apiConfig } from "shared/config/api";

export interface InstrumentLoader {
  instrument: InstrumentDetail;
  favorite: boolean;
}

const getInstrumentById = new GetInstrumentByIdApi(apiConfig);
const listFavorite = new ListFavoriteApi(apiConfig);

export const loader: LoaderFunction = async ({
  params,
}): Promise<InstrumentLoader> => {
  const instrumentRequest = await getInstrumentById.getInstrumentById(
    parseInt(params.instrumentId as string),
  );

  const listFavoriteRequest = await listFavorite.listFavorite({
    withCredentials: true,
  });

  if (instrumentRequest.status !== 200) {
    throw new Error(
      `Failed to extract instrument ID: '${params.instrumentId}'`,
    );
  }

  const instrument = instrumentRequest.data;
  const favoriteIds = listFavoriteRequest.data.content.map(
    (instrument_detail) => instrument_detail.instrument_id.instrument_id,
  );

  return {
    instrument: instrument,
    favorite: favoriteIds.includes(instrument.instrument_id.instrument_id),
  };
};
