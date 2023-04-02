import {Request, Response} from 'express';
import {connection} from '../routes/utils/database';

const callback = (res: Response, err: { message: unknown }, results: unknown[]) => {
	if (err) {
		res.status(500).json({error: err.message});
	} else {
		res.status(200).json(results);
	}
};

export const getStudioNames = (req: Request, res: Response) => {
	connection.query(
		`SELECT name FROM studio`,
		(err: { message: unknown }, results: unknown[]) => callback(res, err, results)
	);
}

export const getIndividualDeveloperNames = (req: Request, res: Response) => {
	connection.query(
		`SELECT name FROM individualdeveloper`,
		(err: { message: unknown }, results: unknown[]) => callback(res, err, results)
	);
}

export const getStudio = (req: Request, res: Response) => {
	const name: string = req.params.name;
	connection.query(
		`SELECT *
			FROM developer D, studio S, country C
			WHERE D.name = S.name
			AND S.country = C.country
			AND D.name = '${name}'`,
		(err: { message: unknown }, results: unknown[]) => callback(res, err, results)
	);
};

export const getIndividualDeveloper = (req: Request, res: Response) => {
	const name: string = req.params.name;
	connection.query(
		`SELECT *
			FROM developer D, individualdeveloper I
			WHERE D.name = I.name
			AND D.name = '${name}'`,
		(err: { message: unknown }, results: unknown[]) => callback(res, err, results)
	);
};









