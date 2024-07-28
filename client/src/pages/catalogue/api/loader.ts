import axios from "axios";
import {API_INSTRUMENTS, SERVER_URL} from "shared/config";
import {Instruments} from "@pages/catalogue";

export const loader = async (): Promise<Instruments> => {
    const { data, status } = await axios.post<Instruments>(`${SERVER_URL}${API_INSTRUMENTS}`, {
        body: {},
    });
    if (status !== 200) {
        throw new Error(`Failed to extract instruments`);
    }
    return data;
}