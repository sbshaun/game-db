import { Request, Response } from 'express';
import { connection } from '../routes/utils/database';
import { VideoGame } from '../routes/types/types';
import { ResultSetHeader } from 'mysql2';

export const getAllVideogames = (req: Request, res: Response) => {
	let selectedColumns = req.query.selectedColumns as string[];
	const ratingFilter = req.query.ratingFilter as string;

	const allowedColumns = [
		'name',
		'release_date',
		'genre',
		'synopsis',
		'rating',
		'sales',
		'developer_name',
		'start_date',
		'end_date',
		'franchise_name',
	];

	if (!selectedColumns || !selectedColumns.length) {
		res.status(200).json([]);
	}

	const sanitizedColumns = selectedColumns
		.filter(column => allowedColumns.includes(column))
		.map(column =>
			column === 'release_date'
				? `DATE_FORMAT(release_date, '%Y-%m-%d') AS release_date`
				: column
		);

	let query = `SELECT ${sanitizedColumns.join(', ')} FROM videogame`;

	if (ratingFilter) {
		query += ' WHERE rating = ?';
	}

	try {
		connection.query(query, [ratingFilter], function (err, results, fields) {
			if (err) {
				res.status(500).json({ error: err.message });
			} else {
				res.status(200).json(results);
			}
		});
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
		const [isGameExists]: any = connection.query<ResultSetHeader>(
			'SELECT name FROM videogame WHERE name = ?',
			[game.name]
		);
		if (isGameExists.length) {
			return res
				.status(400)
				.json({ error: 'Videogame with this name already exists' });
		}

		if (game.developer_name) {
			const [isDeveloperExists]: any = connection.query<ResultSetHeader>(
				'SELECT name FROM developer WHERE name = ?',
				[game.developer_name]
			);
			if (!isDeveloperExists.length) {
				return res
					.status(400)
					.json({ error: 'Invalid developer_name foreign key' });
			}
		}

		if (game.franchise_name) {
			const [isFranchiseExists]: any = connection.query<ResultSetHeader>(
				'SELECT name FROM franchise WHERE name = ?',
				[game.franchise_name]
			);
			if (!isFranchiseExists.length) {
				return res
					.status(400)
					.json({ error: 'Invalid franchise_name foreign key' });
			}
		}

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
		if (game.developer_name) {
			const [isDeveloperExists]: any = connection.query<ResultSetHeader>(
				'SELECT name FROM developer WHERE name = ?',
				[game.developer_name]
			);
			if (!isDeveloperExists.length) {
				return res
					.status(400)
					.json({ error: 'Invalid developer_name foreign key' });
			}
		}

		if (game.franchise_name) {
			const [isFranchiseExists]: any = connection.query<ResultSetHeader>(
				'SELECT name FROM franchise WHERE name = ?',
				[game.franchise_name]
			);
			if (!isFranchiseExists.length) {
				return res
					.status(400)
					.json({ error: 'Invalid franchise_name foreign key' });
			}
		}

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
		res.status(500).json({
			error:
				'test erorrtest erorrtest erorrtest erorrtest erorrtest erorrtest erorr',
		});
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
