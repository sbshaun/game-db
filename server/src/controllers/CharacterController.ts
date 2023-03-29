import {Request, Response} from "express";
import {connection} from "../routes/utils/database";

export const getAllCharacters = (req: Request, res: Response) => {
	const columns: string = (req.body as string[]).join(", ");
	return connection.query(
		`SELECT ${columns} FROM characters`,
		(err: { message: unknown }, results: unknown) => {
			if (err) res.status(500).json({error: err.message});
			else res.status(200).json(results);
		}
	)
}