import {Request, Response} from 'express';
import {connection} from '../routes/utils/database';

export const getAllDevelopers = (req: Request, res: Response) => {
	const columns: string = (req.body as string[]).join(", ");
	return connection.query(
		`SELECT ${columns} FROM developer D`,
		(err: { message: unknown }, results: unknown) => {
			if (err) res.status(500).json({error: err.message});
			else res.status(200).json(results);
		}
	)
}

export const getAllStudios = (req: Request, res: Response) => {
	const columns: string = getColumnsForJoin(req.body);
	return connection.query(
		`SELECT ${columns}
			FROM developer D, studio S
			WHERE D.name = S.name`,
		(err: { message: unknown }, results: unknown) => {
			if (err) res.status(500).json({error: err.message});
			else res.status(200).json(results);
		}
	)
}

export const getStudiosByCountry = (req: Request, res: Response) => {
	const columns: string = getColumnsForJoin(req.body);
	const country: string = req.params.country;
	return connection.query(
		`SELECT ${columns}
			FROM developer D, studio S
			WHERE D.name = S.name
			AND S.country = '${country}'`,
		(err: { message: unknown }, results: unknown) => {
			if (err) res.status(500).json({error: err.message});
			else res.status(200).json(results);
		}
	)
}

export const getAllIndividualDevelopers = (req: Request, res: Response) => {
	const columns: string = getColumnsForJoin(req.body);
	return connection.query(
		`SELECT ${columns}
			FROM developer D, individualdeveloper I
			WHERE D.name = I.name`,
		(err: { message: unknown }, results: unknown) => {
			if (err) res.status(500).json({error: err.message});
			else res.status(200).json(results);
		}
	)
}

const getColumnsForJoin = (columnsArray: string[]): string => {
	for (let i = 0; i < columnsArray.length; i++) {
		if (columnsArray[i] === "name") {
			columnsArray[i] = "D.name AS name";
		}
	}
	return columnsArray.join(", ");
}







