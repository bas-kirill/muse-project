import { Filters } from "widgets/catalogue-filter";
import type {
  GetInstrumentByCriteriaPageResponse,
  GetInstrumentCriteriaRequestBody,
} from "generated/model";
import { GetInstrumentsByCriteriaPaginatedApi } from "generated/api/get-instruments-by-criteria-paginated-api";

const getInstrumentsByCriteriaPaginatedApi =
  new GetInstrumentsByCriteriaPaginatedApi();

export const getInstrumentsByCriteriaPaginated = async (
  filters: Filters,
  pageSize: number,
  pageNumber: number,
): Promise<GetInstrumentByCriteriaPageResponse> => {
  const response =
    await getInstrumentsByCriteriaPaginatedApi.getInstrumentsByCriteriaPaginated(
      pageSize,
      pageNumber,
      JSON.stringify(filters, null, 2) as GetInstrumentCriteriaRequestBody,
    );

  if (response.status !== 200) {
    throw new Error("Failed to fetch instruments");
  }

  return response.data;
};
