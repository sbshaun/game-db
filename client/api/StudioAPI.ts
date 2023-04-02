import axios from "axios";
import {DeveloperStudioCountry} from "~/types/types";

const server_port = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export async function fetchStudioNames(): Promise<string[]> {
	try {
		const res: Array<{name: string}> = (await axios.get(`${server_port}/studios`)).data;
		return res.map((tuple) => tuple.name);
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function fetchStudio(name: string): Promise<DeveloperStudioCountry> {
	try {
		const res: DeveloperStudioCountry[] = (await axios.get(`${server_port}/studios/${name}`)).data;
		return res[0];
	} catch (error) {
		console.error(error);
		return {
			name: "",
			website_link: null,
			description: null,
			year_established: null,
			country: null,
			country_code: null,
			phone_number: null
		};
	}
}