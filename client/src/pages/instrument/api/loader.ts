import axios from "axios";
import {SERVER_URL} from "shared/config";
import {API_INSTRUMENT_BY_ID} from "shared/config/backend";
import {LoaderFunction} from "react-router-dom";

interface GetInstrumentByIdResponse {
    id: number
    name: string
    type: string
    manufacturer: string
    manufacturerDate: string
    releaseDate: string
    country: string
    basicMaterials: string[]
}

interface Params {
    instrumentId: string;
}

export const loader: LoaderFunction = async ({ params }): Promise<GetInstrumentByIdResponse> => {
    const url = `${SERVER_URL}${API_INSTRUMENT_BY_ID}` + params.instrumentId;
    const { data, status } = await axios.get<GetInstrumentByIdResponse>(url);


    if (status !== 200) {
        throw new Error(`Failed to extract instrument ID: '${params.instrumentId}'`);
    }

    return data
}