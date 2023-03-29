import axios from 'axios';
import { VideoGame } from '~~/types/types';

const server_port = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export async function fetchVideogames(): Promise<VideoGame[]> {
	try {
		const response = await axios.get(`${server_port}/videogame`);
		return response.data.map(parseVideoGame);
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function fetchVideoGameById(
	id: number
): Promise<VideoGame | null> {
	try {
		const response = await axios.get(`${server_port}/videogame/${id}`);
		return parseVideoGame(response.data);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function fetchFilteredVideogames(
	selectedColumns: string[],
	ratingFilter?: string
): Promise<VideoGame[]> {
	try {
		const response = await axios.get(`${server_port}/videogame`, {
			params: { selectedColumns, ratingFilter },
		});
		return response.data.map(parseVideoGame);
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function insertVideoGame(
	videoGame: VideoGame
): Promise<VideoGame | null> {
	try {
		const response = await axios.post(`${server_port}/videogame/`, videoGame);
		return parseVideoGame(response.data);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function updateVideoGameByName(
	name: string,
	updatedVideoGame: Partial<VideoGame>
): Promise<VideoGame | null> {
	try {
		const response = await axios.put(
			`${server_port}/videogame/${name}`,
			updatedVideoGame
		);
		return parseVideoGame(response.data[0]);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function deleteVideoGameByName(
	name: string
): Promise<{ success: boolean; message: string }> {
	try {
		const response = await axios.delete(`${server_port}/videogame/${name}`);
		return { success: true, message: response.data.message };
	} catch (error: any) {
		console.error(error);
		return { success: false, message: error.response.data.error };
	}
}

function parseVideoGame(rawData: any): VideoGame {
	return {
		name: rawData.name,
		release_date: rawData.release_date || null,
		genre: rawData.genre || null,
		synopsis: rawData.synopsis || null,
		rating: rawData.rating || null,
		sales: rawData.sales || null,
		developer_name: rawData.developer_name || null,
		start_date: rawData.start_date || null,
		end_date: rawData.end_date || null,
		franchise_name: rawData.franchise_name || null,
	};
}
