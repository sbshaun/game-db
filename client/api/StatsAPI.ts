import axios from "axios";
import {AggregationGroup} from "~/types/types";

const server_port = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export async function fetchMeasureOfSalesPerGroup(group: string, measure: string): Promise<AggregationGroup[]> {
    try {
        const response = await axios.get(`${server_port}/stats/${group}/sales/${measure}`);
        return response.data as AggregationGroup[];
    } catch (e) {
        console.error(e.message);
        return [];
    }
}