import axios from 'axios';

interface ServerResponse {
	message: string;
}

// delete this in the future
async function getServerResponse(): Promise<ServerResponse> {
	try {
		const response = await axios.get<ServerResponse>('http://localhost:4000/');
		return response.data;
	} catch (error) {
		console.error(error);
		return { message: 'Error getting server response' };
	}
}

export default getServerResponse;
