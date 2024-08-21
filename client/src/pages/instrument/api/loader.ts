import { LoaderFunction } from "react-router-dom";
import { InstrumentDetail } from "generated/model";
import { GetInstrumentByIdApi } from "generated/api/get-instrument-by-id-api";

const getInstrumentById = new GetInstrumentByIdApi();

export const loader: LoaderFunction = async ({
  params,
}): Promise<InstrumentDetail> => {
  const response = await getInstrumentById.getInstrumentById(
    params.instrumentId as string,
  );

  if (response.status !== 200) {
    throw new Error(
      `Failed to extract instrument ID: '${params.instrumentId}'`,
    );
  }

  return response.data;
};
