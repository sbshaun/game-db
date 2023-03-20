import axios from 'axios';

const server_port = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';
interface ServerResponse {
	message: string;
}

// delete this in the future
async function getServerResponse(): Promise<ServerResponse> {
	try {
		const response = await axios.get<ServerResponse>(`${server_port}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return { message: 'Error getting server response' };
	}
}

export default getServerResponse;
