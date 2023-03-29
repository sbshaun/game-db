import {Character, Franchise} from "~/types/types";
import axios from "axios";

const server_port = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export async function fetchFranchiseProjection(selectedFields: string[]): Promise<Franchise[]> {
    try {
        console.log(selectedFields)
        const response = await axios.post(`${server_port}/franchises`, selectedFields);
        return response.data as Franchise[];
    } catch (e) {
        console.error(e.message);
        return [];
    }
}

export async function fetchCharactersInEntireFranchise(franchiseName: string): Promise<Character[]> {
    try {
        console.log(franchiseName);
        const response = await axios.get(`${server_port}/franchises/${franchiseName}/characters`)
        return response.data as Character[];
    } catch (e) {
        console.error(e.message);
    }
}