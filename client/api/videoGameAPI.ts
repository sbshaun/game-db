import axios from 'axios';
import { VideoGame } from '~~/types/types';

export async function fetchVideogames(): Promise<VideoGame[]> {
	try {
		const response = await axios.get(
			'http://localhost:4000/videogames/getVideogames'
		);
		return response.data.map(parseVideoGame);
	} catch (error) {
		console.error(error);
		return [];
	}
}

function parseVideoGame(rawData: any): VideoGame {
	return {
		game_id: rawData.game_id,
		name: rawData.name,
		release_date: rawData.release_date || null,
		genre: rawData.genre || null,
		synopsis: rawData.synopsis || null,
		rating: rawData.rating || null,
		sales: rawData.sales || null,
		developer_id: rawData.developer_id || null,
		start_date: rawData.start_date || null,
		end_date: rawData.end_date || null,
		franchise_id: rawData.franchise_id || null,
	};
}
