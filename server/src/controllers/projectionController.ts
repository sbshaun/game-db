import { Request, Response } from 'express';
import { connection } from '../routes/utils/database';

export const getProjections = (req: Request, res: Response) => {
	const tableName = req.params.tableName;
	const selectedColumns = req.query.selectedColumns as string;

	// if no select, select all by default
	if (!selectedColumns || !selectedColumns.length) {
		res.status(200).json([]);
	}

	const selectedColumnsList = selectedColumns.split(',');
	const formattedColumns = selectedColumnsList.map(column => {
		if (
			column === 'release_date' ||
			column === 'birthdate' ||
			column === 'time_created'
		) {
			// DATE
			return `DATE_FORMAT(${column}, '%Y-%m-%d') AS ${column}`;
		} else if (column === 'time_created') {
			// DATETIME
			return `DATE_FORMAT(${column}, '%Y-%m-%d %H:%i:%s') AS ${column}`;
		} else {
			return column;
		}
	});

	const query = `SELECT ${formattedColumns.join(', ')} FROM ${tableName}`;

	try {
		connection.query(
			query,
			function (err: { message: any }, results: any[], fields: any) {
				if (err) {
					res.status(500).json({ error: err.message });
				} else {
					res.status(200).json(results);
				}
			}
		);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
