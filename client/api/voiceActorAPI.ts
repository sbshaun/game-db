import axios from 'axios';
import { VoiceActor } from '~~/types/types';

const server_port = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export async function fetchVoiceActors(): Promise<VoiceActor[]> {
	try {
		const response = await axios.get(
			`${server_port}/voiceactor/getAllVoiceActors`
		);
		return response.data.map(parseVoiceActor);
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function fetchVoiceActorById(
	id: number
): Promise<VoiceActor | null> {
	try {
		const response = await axios.get(`${server_port}/voiceactor/${id}`);
		return parseVoiceActor(response.data);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function insertVoiceActor(
	voiceActor: VoiceActor
): Promise<VoiceActor | null> {
	try {
		const response = await axios.post(
			`${server_port}/voiceactor/createVoiceActor`,
			voiceActor
		);
		return parseVoiceActor(response.data);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function updateVoiceActorById(
	id: number,
	updatedVoiceActor: Partial<VoiceActor>
): Promise<VoiceActor | null> {
	try {
		const response = await axios.put(
			`${server_port}/voiceactor/updateVoiceActor/${id}`,
			updatedVoiceActor
		);
		return parseVoiceActor(response.data);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function deleteVoiceActorById(
	id: number
): Promise<{ success: boolean; message: string }> {
	try {
		const response = await axios.delete(`${server_port}/voiceactor/${id}`);
		return { success: true, message: response.data.message };
	} catch (error: any) {
		console.error(error);
		return { success: false, message: error.response.data.error };
	}
}

function parseVoiceActor(rawData: any): VoiceActor {
	return {
		actor_id: rawData.actor_id,
		name: rawData.name,
		biography: rawData.biography || '',
		birthdate: rawData.birthdate || null,
	};
}
