import { Request, Response } from 'express';
import { connection } from '../routes/utils/database';
import { VideoGame } from '../routes/types/types';
import { ResultSetHeader } from 'mysql2';

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

const queryAsync = (query: string, params: any[] = []): Promise<any> => {
	return new Promise((resolve, reject) => {
		connection.query<ResultSetHeader>(query, params, (error, results) => {
			if (error) reject(error);
			else resolve(results);
		});
	});
};

export const getAllVideogames = async (req: Request, res: Response) => {
	let selectedColumns = req.query.selectedColumns as string[];
	const ratingFilter = req.query.ratingFilter as string;

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
		const results = await queryAsync(query, [ratingFilter]);
		res.status(200).json(results);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const getVideogameByName = async (req: Request, res: Response) => {
	const name = req.params.name;
	try {
		const results = await queryAsync(
			`SELECT name, DATE_FORMAT(release_date, '%Y-%m-%d') as release_date, genre, synopsis, rating, sales, developer_name, start_date, end_date, franchise_name FROM videogame WHERE name = ?`,
			[name]
		);
		res.status(200).json(results);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const createVideogame = async (req: Request, res: Response) => {
	const game: VideoGame = req.body;

	if (game.developer_name === '') game.developer_name = null;
	if (game.franchise_name === '') game.franchise_name = null;

	try {
		const isGameExists = await queryAsync(
			'SELECT name FROM videogame WHERE name = ?',
			[game.name]
		);
		if (isGameExists.length) {
			return res
				.status(400)
				.json({ error: 'Videogame with this name already exists' });
		}

		if (game.developer_name) {
			const isDeveloperExists = await queryAsync(
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
			const isFranchiseExists = await queryAsync(
				'SELECT name FROM franchise WHERE name = ?',
				[game.franchise_name]
			);
			if (!isFranchiseExists.length) {
				return res
					.status(400)
					.json({ error: 'Invalid franchise_name foreign key' });
			}
		}

		await queryAsync('INSERT INTO videogame SET ?', [game]);
		const createdGame = await queryAsync(
			`SELECT name, DATE_FORMAT(release_date, '%Y-%m-%d') as release_date, genre, synopsis, rating, sales, developer_name, start_date, end_date, franchise_name FROM videogame WHERE name = ?`,
			[game.name]
		);

		res.status(201).json({
			message: 'Videogame created successfully',
			game: createdGame[0],
		});
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
			const isDeveloperExists = await queryAsync(
				'SELECT * FROM developer WHERE name = ?',
				[game.developer_name]
			);

			if (!isDeveloperExists.length) {
				return res
					.status(400)
					.json({ error: 'Invalid developer_name foreign key' });
			}
		}

		if (game.franchise_name) {
			const isFranchiseExists = await queryAsync(
				'SELECT name FROM franchise WHERE name = ?',
				[game.franchise_name]
			);

			if (!isFranchiseExists.length) {
				return res
					.status(400)
					.json({ error: 'Invalid franchise_name foreign key' });
			}
		}

		await queryAsync('UPDATE videogame SET ? WHERE name = ?', [game, name]);
		const updatedGame = await queryAsync(
			`SELECT name, DATE_FORMAT(release_date, '%Y-%m-%d') as release_date, genre, synopsis, rating, sales, developer_name, start_date, end_date, franchise_name FROM videogame WHERE name = ?`,
			[name]
		);
		res.status(200).json(updatedGame);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export const deleteVideogame = async (req: Request, res: Response) => {
	const name = req.params.name;

	try {
		await queryAsync('DELETE FROM videogame WHERE name = ?', [name]);
		res.status(200).json({ message: 'Videogame deleted' });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};
