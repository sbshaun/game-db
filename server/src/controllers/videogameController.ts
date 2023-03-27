import { Request, Response } from 'express';
import { connection } from '../routes/utils/database';
import { VideoGame } from '../routes/types/types';
import { ResultSetHeader } from 'mysql2';

export const getAllVideogames = (req: Request, res: Response) => {
	let selectedColumns = req.query.selectedColumns as string[];
	// if no select, select all by default
	if (!selectedColumns || !selectedColumns.length) {
		res.status(200).json([]);
	}

	const formattedColumns = selectedColumns.map(column => {
		return column === 'release_date'
			? `DATE_FORMAT(release_date, '%Y-%m-%d') AS release_date`
			: column;
	});

	const query = `SELECT ${formattedColumns.join(', ')} FROM videogame`;

	try {
		connection.query(
			query,
			function (err: { message: any }, results: VideoGame[], fields: any) {
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

export const getVideogameByName = async (req: Request, res: Response) => {
	const name = req.params.name;
	try {
		connection.query(
			'SELECT * FROM videogame WHERE name = ?',
			[name],
			function (err, results, fields) {
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

export const createVideogame = async (req: Request, res: Response) => {
	const game: VideoGame = req.body;

	if (game.developer_name === '') game.developer_name = null;
	if (game.franchise_name === '') game.franchise_name = null;

	try {
		const [result]: any = connection.query<ResultSetHeader>(
			'INSERT INTO videogame SET ?',
			game
		);
		connection.query(
			'SELECT * FROM videogame WHERE name = ?',
			[result.name],
			function (err, results, fields) {
				if (err) {
					res.status(500).json({ error: err.message });
				} else {
					res.status(200).json(results);
				}
			}
		);
		res.status(201).json({ message: 'Videogame created', id: result.insertId });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const updateVideogame = async (req: Request, res: Response) => {
	const name = req.params.name;
	const game: Partial<VideoGame> = req.body;

	if (game.developer_name === '') game.developer_name = null;
	if (game.franchise_name === '') game.franchise_name = null;

	try {
		connection.query<ResultSetHeader>('UPDATE videogame SET ? WHERE name = ?', [
			game,
			name,
		]);
		connection.query(
			'SELECT * FROM videogame WHERE name = ?',
			[name],
			function (err, results, fields) {
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

export const deleteVideogame = async (req: Request, res: Response) => {
	const name = req.params.name;

	try {
		connection.query<ResultSetHeader>('DELETE FROM videogame WHERE name = ?', [
			name,
		]);
		res.status(200).json({ message: 'Videogame deleted' });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
