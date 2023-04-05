import axios from 'axios';

const server_port = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export async function fetchProjections(
	tableName: string,
	selectedColumns: string[]
): Promise<any[]> {
	try {
		const response = await axios.get(
			`${server_port}/projections/${tableName}?selectedColumns=${selectedColumns.join(
				','
			)}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return [];
	}
}
