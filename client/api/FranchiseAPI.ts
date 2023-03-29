import {Character} from "~/types/types";
import axios from "axios";

const server_port = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export async function fetchFranchiseNames(): Promise<string[]> {
    try {
        const response = await axios.get(`${server_port}/franchise/names`);
        return response.data as string[];
    } catch (e) {
        console.error(e.message);
        return [];
    }
}

export async function fetchCharactersInEntireFranchise(franchiseName: string): Promise<Character[]> {
    try {
        console.log(franchiseName);
        const response = await axios.get(`${server_port}/franchise/${franchiseName}/characters`)
        return response.data as Character[];
    } catch (e) {
        console.error(e.message);
    }
}