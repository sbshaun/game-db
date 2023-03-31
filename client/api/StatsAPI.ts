import axios from "axios";
import {AggregationGroup} from "~/types/types";

const server_port = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export async function fetchMeasureOfSalesPerGroup(group: string, measure: string): Promise<AggregationGroup[]> {
    try {
        const response = await axios.get(`${server_port}/stats/${group.toLowerCase()}/sales/${measure}`);
        return response.data as AggregationGroup[];
    } catch (e) {
        console.error(e.message);
        return [];
    }
}

export async function fetchCountByGroup(group: string, operation: string, count: number): Promise<AggregationGroup[]> {
    try {
        const response = await axios.post(
            `${server_port}/stats/${group.toLowerCase()}/count`,
            {
                count: count,
                operation: operation
            }
        )
        return response.data as AggregationGroup[];
    } catch (e) {
        console.error(e.message);
        return [];
    }
}

export async function fetchExtremaByGroup(group: string, measure: string, extrema: string) {
    try {
        const response = await axios.get(
            `${server_port}/stats/${group.toLowerCase()}/sales/${measure}/${extrema.toLowerCase()}`)
        return response.data as AggregationGroup[];
    } catch (e) {
        console.error(e.message);
        return [];
    }
}