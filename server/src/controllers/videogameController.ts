import { Request, Response } from 'express';
import { connection } from '../routes/utils/database';
import { VideoGame } from '../routes/types/types';

export const getAllVideogames = (req: Request, res: Response) => {
	connection.query(
		'SELECT * FROM videogame',
		function (err: { message: any }, results: VideoGame[], fields: any) {
			if (err) {
				res.status(500).json({ error: err.message });
			} else {
				res.status(200).json(results);
			}
		}
	);
};

export const getVideogameById = (req: Request, res: Response) => {
	const id = req.params.id;
	if (id) {
		return res.status(200).json('getVideogameById ok');
	} else {
		return res.status(400).json('id required');
	}
	// ... TODO: implement
};

export const createVideogame = (req: Request, res: Response) => {
	const game: VideoGame = req.body;
	return res.status(200).json('createVideogame ok');
	// ... TODO: implement
};

export const updateVideogame = (req: Request, res: Response) => {
	const id = req.params.id;
	const game: Partial<VideoGame> = req.body;
	return res.status(200).json('updateVideogame ok');
	// ... TODO: implement
};

export const deleteVideogame = (req: Request, res: Response) => {
	const id = req.params.id;
	return res.status(200).json('deleteVideogame ok');
	// ... TODO: implement
};
