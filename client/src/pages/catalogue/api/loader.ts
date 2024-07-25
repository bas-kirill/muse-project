import axios from "axios";
import {API_INSTRUMENTS, SERVER_URL} from "shared/config";

interface Instrument {
    id: number
    name: string
    type: string
    manufacturer: string
    manufacturerDate: string
    releaseDate: string
    country: string
    basicMaterials: string[]
}

export type GetInstrumentsResponse = Instrument[];

export const loader = async (): Promise<GetInstrumentsResponse> => {
    const { data, status } = await axios.get<GetInstrumentsResponse>(`${SERVER_URL}${API_INSTRUMENTS}`);
    if (status !== 200) {
        throw new Error(`Failed to extract instruments`);
    }
    return data;
}