import {Request, Response} from 'express';
import {connection} from '../routes/utils/database';

const projectCallback = (res: Response, err: {message: unknown}, results: unknown[]) => {
	if (err) {
		res.status(400).json({error: err.message});
	} else {
		res.status(200).json(results);
	}
};

export const projectDevelopers = (req: Request, res: Response) => {
	const columns: string = (req.body as string[]).join(", ");
	connection.query(
		`SELECT ${columns} FROM developer`,
		(err: { message: unknown }, results: unknown[]) => projectCallback(res, err, results)
	);
};

export const projectStudios = (req: Request, res: Response) => {
	const columns: string = (req.body as string[]).join(", ");
	connection.query(
		`SELECT ${columns} FROM studio`,
		(err: { message: unknown }, results: unknown[]) => projectCallback(res, err, results)
	);
};

export const projectIndividualDevelopers = (req: Request, res: Response) => {
	const columns: string = (req.body as string[]).join(", ");
	connection.query(
		`SELECT ${columns} FROM individualdeveloper`,
		(err: { message: unknown }, results: unknown[]) => projectCallback(res, err, results)
	);
};

const getCallback = (res: Response, err: { message: unknown }, results: unknown[]) => {
	if (err) {
		res.status(400).json({error: err.message});
	} else if (results.length === 0) {
		res.status(404).send();
	} else {
		res.status(200).json(results[0]);
	}
};

export const getDeveloper = (req: Request, res: Response) => {
	const name: string = req.params.name;
	connection.query(
		`SELECT * FROM developer WHERE name = '${name}'`,
		(err: { message: unknown }, results: unknown[]) => getCallback(res, err, results)
	);
};

export const getStudio = (req: Request, res: Response) => {
	const name: string = req.params.name;
	connection.query(
		`SELECT *
			FROM developer D, studio S
			WHERE D.name = S.name
			AND D.name = '${name}'`,
		(err: { message: unknown }, results: unknown[]) => getCallback(res, err, results)
	);
};

export const getIndividualDeveloper = (req: Request, res: Response) => {
	const name: string = req.params.name;
	connection.query(
		`SELECT *
			FROM developer D, individualdeveloper I
			WHERE D.name = I.name
			AND D.name = '${name}'`,
		(err: { message: unknown }, results: unknown[]) => getCallback(res, err, results)
	);
};

export const deleteDeveloper = (req: Request, res: Response) => {
	const name: string = req.params.name;
	connection.query(
		`DELETE FROM developer WHERE name = '${name}'`,
		(err: {message: unknown}) => {
			if (err) {
				res.status(400).json({error: err.message});
			} else {
				res.status(204).send();
			}
		}
	);
};







